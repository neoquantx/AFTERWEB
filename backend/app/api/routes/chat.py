from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(tags=["Curator Chat"])
chat_service = ChatService()


@router.post("/chat", response_model=ChatResponse)
async def post_chat(request: ChatRequest):
    """
    Evidence-grounded archaeological assistant using local Ollama.
    Answers strictly using retrieved excerpts and attaches validated citation markers.
    """
    return await chat_service.handle_chat(
        question=request.question,
        active_node_id=request.active_node_id
    )
