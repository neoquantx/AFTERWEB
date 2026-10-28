import sqlite3
import re
from typing import List, Optional
from app.db.database import get_db_connection
from app.models.schemas import Citation


STOP_WORDS = {
    "a", "about", "an", "and", "are", "as", "at", "be", "by", "for", "from",
    "how", "i", "in", "is", "it", "of", "on", "or", "that", "the", "this",
    "to", "was", "what", "when", "where", "which", "who", "why", "will", "with"
}


def clean_fts_query(query_str: str) -> str:
    """Sanitize and prepare a query string for SQLite FTS5 MATCH, filtering out common stopwords."""
    cleaned = re.sub(r"[^\w\s]", " ", query_str).strip()
    words = cleaned.split()
    if not words:
        return ""

    content_words = [w for w in words if w.lower() not in STOP_WORDS]
    # If all words were stopwords, fall back to non-stopword or first word
    target_words = content_words if content_words else words

    return " OR ".join(f'"{word}"*' for word in target_words[:8])


def search_evidence(
    query_str: str,
    site_id: Optional[str] = None,
    limit: int = 4
) -> List[Citation]:
    """
    Search indexed text chunks using SQLite FTS5 and return bounded citations.
    """
    fts_query = clean_fts_query(query_str)
    if not fts_query:
        return []

    sql = """
        SELECT 
            c.id AS chunk_id,
            c.text AS chunk_text,
            c.source_label,
            p.title AS page_title,
            p.canonical_url,
            cap.timestamp AS capture_timestamp,
            cap.archive_url,
            cap.original_url,
            rank
        FROM chunk_fts(?) AS fts
        JOIN chunks c ON c.rowid = fts.rowid
        JOIN pages p ON p.id = c.page_id
        JOIN captures cap ON cap.id = p.capture_id
    """

    params = [fts_query]

    if site_id:
        sql += " WHERE p.site_id = ? "
        params.append(site_id)

    sql += " ORDER BY rank LIMIT ?;"
    params.append(limit)

    citations: List[Citation] = []
    with get_db_connection() as conn:
        try:
            cursor = conn.execute(sql, params)
            rows = cursor.fetchall()

            for i, row in enumerate(rows):
                citations.append(
                    Citation(
                        id=f"E{i + 1}",
                        chunk_id=row["chunk_id"],
                        page_title=row["page_title"],
                        capture_timestamp=str(row["capture_timestamp"]),
                        original_url=row["original_url"] or row["canonical_url"],
                        archive_url=row["archive_url"] or "",
                        excerpt=row["chunk_text"][:350] + ("..." if len(row["chunk_text"]) > 350 else "")
                    )
                )
        except sqlite3.OperationalError:
            # Fallback for empty or unindexed FTS
            return []

    return citations
