import asyncio
import json
from pathlib import Path
from app.services.archive_client import ArchiveClient

MANIFEST_PATH = Path("data/seed_manifest.json")


async def probe_seeds():
    if not MANIFEST_PATH.exists():
        print(f"Error: Manifest not found at {MANIFEST_PATH}")
        return

    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    client = ArchiveClient()
    print("=== Probing Seed Manifest Candidates ===")

    for site in manifest.get("sites", []):
        url = site["root_url"]
        print(f"\nChecking [{site['title']}] ({url})...")
        records = await client.query_cdx(url=url, limit=3)
        if records:
            print(f"  ✓ Found {len(records)} captures in Wayback CDX.")
            for r in records:
                print(f"    - Timestamp: {r.get('timestamp')}, Status: {r.get('statuscode')}")
        else:
            print("  ✗ No captures returned from CDX query or query timed out.")


if __name__ == "__main__":
    asyncio.run(probe_seeds())
