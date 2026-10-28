import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Generator
from app.core.config import settings

SCHEMA_PATH = Path(__file__).parent / "schema.sql"


def get_db_path() -> Path:
    db_path = settings.db_file_path
    db_path.parent.mkdir(parents=True, exist_ok=True)
    return db_path


def init_db() -> None:
    """Initialize database tables and FTS5 search index."""
    db_path = get_db_path()
    with sqlite3.connect(db_path) as conn:
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("PRAGMA foreign_keys=ON;")
        with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
            conn.executescript(f.read())
        conn.commit()


@contextmanager
def get_db_connection() -> Generator[sqlite3.Connection, None, None]:
    """Yield a SQLite connection with row_factory enabled."""
    db_path = get_db_path()
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys=ON;")
    try:
        yield conn
    finally:
        conn.close()
