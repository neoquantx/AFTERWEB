from fastapi import APIRouter, Query
from typing import Optional
from app.models.schemas import EvidenceResponse
from app.services.retrieval import search_evidence

router = APIRouter(tags=["Evidence"])


@router.get("/evidence", response_model=EvidenceResponse)
def get_evidence(
    q: str = Query(..., min_length=1, description="Search query across historical evidence chunks"),
    site_id: Optional[str] = Query(None, description="Optional neighborhood site ID filter"),
    limit: int = Query(5, ge=1, le=20)
):
    """Lexical full-text search against preserved archive chunks using SQLite FTS5."""
    citations = search_evidence(query_str=q, site_id=site_id, limit=limit)
    return EvidenceResponse(
        query=q,
        results_count=len(citations),
        citations=citations
    )
