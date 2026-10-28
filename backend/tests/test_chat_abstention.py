import pytest
from app.services.chat_service import ChatService


@pytest.mark.asyncio
async def test_chat_abstains_on_completely_unknown_topic():
    chat_service = ChatService()
    # Query for a non-existent entity with no node context
    resp = await chat_service.handle_chat(
        question="What is the secret quantum encryption key for Mars Rover 2099?"
    )
    assert resp.abstained is True
    assert "does not contain enough evidence" in resp.answer
