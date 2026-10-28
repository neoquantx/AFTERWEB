from fastapi import APIRouter
from app.models.schemas import HealthResponse
from app.services.ollama_client import OllamaClient
from app.core.config import settings
from app.db.database import get_db_connection

router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse)
async def check_health():
    # 1. Check DB readiness
    db_status = "ready"
    archive_pack_status = "missing"
    try:
        with get_db_connection() as conn:
            page_count = conn.execute("SELECT COUNT(*) FROM pages").fetchone()[0]
            archive_pack_status = "ready" if page_count > 0 else "empty"
    except Exception:
        db_status = "missing"
        archive_pack_status = "missing"

    # 2. Check Ollama & Model
    ollama_client = OllamaClient()
    ollama_info = await ollama_client.check_readiness()

    return HealthResponse(
        api="ok",
        database=db_status,
        archive_pack=archive_pack_status,
        ollama="reachable" if ollama_info["reachable"] else "unreachable",
        model=settings.OLLAMA_MODEL,
        model_available=ollama_info["target_model_available"],
        internet_required_for_core_flow=False
    )
