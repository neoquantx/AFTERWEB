import httpx
from typing import Dict, Any, Optional
from app.core.config import settings


class OllamaClient:
    """
    Communicates strictly with local loopback Ollama instance on http://127.0.0.1:11434.
    Never transmits data to external or hosted endpoints.
    """

    def __init__(self, base_url: Optional[str] = None):
        self.base_url = (base_url or settings.OLLAMA_BASE_URL).rstrip("/")
        self.timeout = settings.OLLAMA_TIMEOUT_SECONDS

    async def check_readiness(self) -> Dict[str, Any]:
        """Check whether Ollama daemon is reachable and if target model is present."""
        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                res = await client.get(f"{self.base_url}/api/tags")
                if res.status_code != 200:
                    return {"reachable": False, "models": [], "target_model_available": False}

                data = res.json()
                models = [m.get("name", "") for m in data.get("models", [])]
                target_present = any(
                    settings.OLLAMA_MODEL in m or settings.OLLAMA_FALLBACK_MODEL in m 
                    for m in models
                )
                return {
                    "reachable": True,
                    "models": models,
                    "target_model_available": target_present
                }
        except Exception:
            return {"reachable": False, "models": [], "target_model_available": False}

    async def generate_response(
        self,
        system_prompt: str,
        user_prompt: str,
        model: Optional[str] = None
    ) -> Optional[str]:
        """Send inference request to local Ollama API."""
        target_model = model
        if not target_model:
            readiness = await self.check_readiness()
            available_models = readiness.get("models", [])
            if any(settings.OLLAMA_MODEL in m for m in available_models):
                target_model = settings.OLLAMA_MODEL
            elif any(settings.OLLAMA_FALLBACK_MODEL in m for m in available_models):
                target_model = settings.OLLAMA_FALLBACK_MODEL
            else:
                target_model = settings.OLLAMA_MODEL
        payload = {
            "model": target_model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "stream": False,
            "options": {
                "temperature": 0.2,
                "num_predict": 1024
            }
        }

        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                res = await client.post(f"{self.base_url}/api/chat", json=payload)
                if res.status_code == 200:
                    data = res.json()
                    msg = data.get("message", {})
                    raw_content = msg.get("content", "").strip()

                    # Strip reasoning tags if present in output (e.g. Qwen3 / DeepSeek)
                    if "</think>" in raw_content:
                        raw_content = raw_content.split("</think>")[-1].strip()

                    # If content is empty but model put output in thinking field
                    if not raw_content and msg.get("thinking"):
                        raw_content = msg.get("thinking", "").strip()

                    return raw_content if raw_content else None
                return None
        except Exception as e:
            print(f"[Ollama Error] {type(e).__name__}: {e}")
            return None
