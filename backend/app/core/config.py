from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
from pathlib import Path


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    BACKEND_HOST: str = "127.0.0.1"
    BACKEND_PORT: int = 8000
    DATABASE_PATH: str = "data/local/afterweb.db"

    OLLAMA_BASE_URL: str = "http://127.0.0.1:11434"
    OLLAMA_MODEL: str = "llama3.2:latest"
    OLLAMA_FALLBACK_MODEL: str = "qwen3:4b"
    OLLAMA_TIMEOUT_SECONDS: float = 60.0

    ALLOWED_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    ARCHIVE_REQUEST_TIMEOUT: float = 15.0
    ARCHIVE_MAX_RETRIES: int = 2

    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]

    @property
    def db_file_path(self) -> Path:
        return Path(self.DATABASE_PATH)


settings = Settings()
