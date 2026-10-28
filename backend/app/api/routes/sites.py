from fastapi import APIRouter, HTTPException
from app.models.schemas import SiteDetail
from app.db.database import get_db_connection

router = APIRouter(tags=["Sites"])


@router.get("/sites/{site_id}", response_model=SiteDetail)
def get_site(site_id: str):
    """Retrieve detailed metadata and counts for a specific historical neighborhood."""
    with get_db_connection() as conn:
        site_row = conn.execute(
            "SELECT * FROM sites WHERE id = ? OR slug = ?",
            (site_id, site_id)
        ).fetchone()

        if not site_row:
            raise HTTPException(status_code=404, detail="Historical neighborhood not found")

        captures_count = conn.execute(
            "SELECT COUNT(*) FROM captures WHERE site_id = ?",
            (site_row["id"],)
        ).fetchone()[0]

        pages_count = conn.execute(
            "SELECT COUNT(*) FROM pages WHERE site_id = ?",
            (site_row["id"],)
        ).fetchone()[0]

        links_count = conn.execute("""
            SELECT COUNT(*) 
            FROM link_edges le
            JOIN pages p ON p.id = le.source_page_id
            WHERE p.site_id = ?
        """, (site_row["id"],)).fetchone()[0]

        return SiteDetail(
            id=site_row["id"],
            slug=site_row["slug"],
            title=site_row["title"],
            domain=site_row["domain"],
            era_label=site_row["era_label"],
            description=site_row["description"],
            source_note=site_row["source_note"],
            district_color=site_row["district_color"],
            captures_count=captures_count,
            pages_count=pages_count,
            observed_links_count=links_count
        )
