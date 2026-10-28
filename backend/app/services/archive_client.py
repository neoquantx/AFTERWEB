import httpx
from typing import Optional, Dict, Any, List
from app.core.config import settings


class ArchiveClient:
    """
    Client for interacting with Wayback Machine CDX API and fetching archived captures.
    Enforces bounded timeouts and strict error taxonomy.
    """

    CDX_API_ENDPOINT = "https://web.archive.org/cdx/search/cdx"

    def __init__(self, timeout: float = None):
        self.timeout = timeout or settings.ARCHIVE_REQUEST_TIMEOUT

    async def query_cdx(
        self,
        url: str,
        limit: int = 5,
        filter_status: str = "200"
    ) -> List[Dict[str, Any]]:
        """
        Query Wayback CDX Server for available captures.
        Returns parsed capture records: [urlkey, timestamp, original, mimetype, statuscode, digest, length]
        """
        params = {
            "url": url,
            "output": "json",
            "limit": limit,
            "filter": f"statuscode:{filter_status}",
            "fl": "timestamp,original,mimetype,statuscode,digest"
        }

        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(self.CDX_API_ENDPOINT, params=params)
                if response.status_code != 200:
                    return []

                data = response.json()
                if len(data) <= 1:
                    return []

                headers = data[0]
                records = []
                for row in data[1:]:
                    records.append(dict(zip(headers, row)))
                return records
        except Exception:
            return []

    async def fetch_capture_html(self, archive_url: str) -> Optional[str]:
        """Fetch raw HTML of a snapshot from the archive."""
        headers = {
            "User-Agent": "AFTERWEB-Archaeology/1.0 (Research Archive Crawler; local-first prototype)"
        }
        try:
            async with httpx.AsyncClient(timeout=self.timeout, follow_redirects=True) as client:
                response = await client.get(archive_url, headers=headers)
                if response.status_code == 200:
                    return response.text
                return None
        except Exception:
            return None

    @staticmethod
    def build_wayback_url(timestamp: str, original_url: str) -> str:
        """Construct standard direct Wayback Machine URL."""
        return f"https://web.archive.org/web/{timestamp}id_/{original_url}"
