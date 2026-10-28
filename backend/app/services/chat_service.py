import time
import re
from typing import Optional, List
from app.models.schemas import ChatResponse, Citation
from app.services.retrieval import search_evidence
from app.services.ollama_client import OllamaClient
from app.prompts.curator_prompt import CURATOR_SYSTEM_PROMPT, format_curator_user_prompt
from app.core.config import settings
from app.db.database import get_db_connection


class ChatService:
    def __init__(self):
        self.ollama = OllamaClient()

    async def handle_chat(
        self,
        question: str,
        active_node_id: Optional[str] = None
    ) -> ChatResponse:
        start_time = time.time()
        question_clean = question.strip()

        # 1. Fetch node context if active_node_id provided
        node_context = ""
        site_id_filter = None
        if active_node_id:
            with get_db_connection() as conn:
                # Check if it's a page node
                page_row = conn.execute(
                    "SELECT p.title, p.canonical_url, p.site_id FROM pages p WHERE p.id = ?",
                    (active_node_id,)
                ).fetchone()
                if page_row:
                    site_id_filter = page_row["site_id"]
                    node_context = f"Active page: '{page_row['title']}' ({page_row['canonical_url']})"
                else:
                    # Check if it's a link edge / ghost plot
                    edge_row = conn.execute(
                        "SELECT anchor_text, target_url, lookup_state FROM link_edges WHERE id = ?",
                        (active_node_id,)
                    ).fetchone()
                    if edge_row:
                        node_context = (
                            f"Active Link/Ghost Plot: Anchor '{edge_row['anchor_text']}', "
                            f"Target URL '{edge_row['target_url']}', "
                            f"Archive Status: '{edge_row['lookup_state']}'"
                        )

        # 2. Retrieve lexical evidence
        citations: List[Citation] = search_evidence(
            query_str=question_clean,
            site_id=site_id_filter,
            limit=4
        )

        # 3. Deterministic abstention if no evidence matched and no node context
        if not citations and not node_context:
            latency_ms = int((time.time() - start_time) * 1000)
            return ChatResponse(
                answer="This collection does not contain enough evidence to answer this question. No matching historical captures were found.",
                citations=[],
                abstained=True,
                model=settings.OLLAMA_MODEL,
                latency_ms=latency_ms
            )

        # 4. Format evidence payload for model
        evidence_text = "\n\n".join(
            f"[{c.id}] (Page: {c.page_title}, Date: {c.capture_timestamp})\n{c.excerpt}"
            for c in citations
        )

        user_prompt = format_curator_user_prompt(
            question=question_clean,
            evidence_payload=evidence_text if evidence_text else "None directly matched text search.",
            node_context=node_context
        )

        # 5. Check Ollama readiness
        ollama_status = await self.ollama.check_readiness()
        if not ollama_status["reachable"]:
            latency_ms = int((time.time() - start_time) * 1000)
            return ChatResponse(
                answer=(
                    "Local AI is offline (Ollama unreachable at 127.0.0.1:11434). "
                    "However, you can still inspect the preserved source evidence and capture records directly."
                ),
                citations=citations,
                abstained=False,
                model="offline",
                latency_ms=latency_ms
            )

        # 6. Execute inference
        model_reply = await self.ollama.generate_response(
            system_prompt=CURATOR_SYSTEM_PROMPT,
            user_prompt=user_prompt
        )

        latency_ms = int((time.time() - start_time) * 1000)

        if not model_reply:
            return ChatResponse(
                answer="The local curator timed out or failed to generate a response. Please try a simpler question.",
                citations=citations,
                abstained=False,
                model=settings.OLLAMA_MODEL,
                latency_ms=latency_ms
            )

        # 7. Validate citations: filter out citation chips that were hallucinated by the model
        valid_citation_ids = {c.id for c in citations}
        # Find citation markers used in text like [E1], [E99]
        cited_markers = set(re.findall(r"\[(E\d+)\]", model_reply))
        
        # Only retain citations that were actually referenced, or keep all retrieved if none explicitly cited
        active_citations = [c for c in citations if c.id in cited_markers] if cited_markers else citations

        return ChatResponse(
            answer=model_reply,
            citations=active_citations,
            abstained=("does not contain enough evidence" in model_reply.lower()),
            model=settings.OLLAMA_MODEL,
            latency_ms=latency_ms
        )
