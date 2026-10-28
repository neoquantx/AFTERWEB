from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.db.database import init_db
from app.api.routes import health, city, sites, evidence, chat


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables and FTS5 triggers on launch
    init_db()
    yield


app = FastAPI(
    title="AFTERWEB API",
    description="Local web archaeology backend and evidence-bound AI curator",
    version="1.0.0",
    lifespan=lifespan
)

# Enforce loopback CORS allowlist
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(health.router, prefix="/api")
app.include_router(city.router, prefix="/api")
app.include_router(sites.router, prefix="/api")
app.include_router(evidence.router, prefix="/api")
app.include_router(chat.router, prefix="/api")


@app.get("/")
def root():
    return {
        "project": "AFTERWEB: The Dead Internet City",
        "status": "online",
        "docs": "/docs",
        "health": "/api/health"
    }
