from bs4 import BeautifulSoup
from typing import Dict, List, Any
import hashlib
from urllib.parse import urljoin, urlparse


class ExtractedLink:
    def __init__(self, anchor_text: str, target_url: str):
        self.anchor_text = anchor_text.strip()
        self.target_url = target_url.strip()


class PageExtractionResult:
    def __init__(
        self,
        title: str,
        cleaned_text: str,
        content_hash: str,
        chunks: List[Dict[str, Any]],
        links: List[ExtractedLink],
        parse_state: str = "ok"
    ):
        self.title = title
        self.cleaned_text = cleaned_text
        self.content_hash = content_hash
        self.chunks = chunks
        self.links = links
        self.parse_state = parse_state


def extract_html_content(
    raw_html: str,
    base_url: str,
    page_id: str,
    chunk_word_size: int = 300
) -> PageExtractionResult:
    """
    Safely parse raw HTML from an archive capture:
    - Strips scripts, styles, forms, and tracking embeds
    - Extracts meaningful title
    - Extracts text in bounded chunk windows
    - Extracts observed <a href="..."> hyperlinks
    """
    if not raw_html or not raw_html.strip():
        return PageExtractionResult(
            title="Empty Capture",
            cleaned_text="",
            content_hash="",
            chunks=[],
            links=[],
            parse_state="empty_text"
        )

    soup = BeautifulSoup(raw_html, "html.parser")

    # Remove non-content elements
    for element in soup(["script", "style", "noscript", "iframe", "svg", "form"]):
        element.decompose()

    # Extract Title
    title_tag = soup.find("title")
    title = title_tag.get_text().strip() if title_tag else ""
    if not title:
        parsed_base = urlparse(base_url)
        title = f"Archived page from {parsed_base.netloc or 'unknown'}"

    # Extract Outbound Links
    links: List[ExtractedLink] = []
    seen_urls = set()

    for a_tag in soup.find_all("a", href=True):
        href = a_tag["href"].strip()
        anchor_text = a_tag.get_text().strip()

        # Skip anchor fragments, javascript links, and mailto
        if not href or href.startswith("#") or href.lower().startswith(("javascript:", "mailto:", "tel:")):
            continue

        # Resolve relative URLs against base_url
        target_url = urljoin(base_url, href)

        # Basic deduplication per page
        dedup_key = (anchor_text.lower(), target_url.lower())
        if dedup_key in seen_urls:
            continue
        seen_urls.add(dedup_key)

        display_text = anchor_text if anchor_text else target_url
        links.append(ExtractedLink(anchor_text=display_text, target_url=target_url))

    # Clean body text
    body_text = soup.get_text(separator="\n", strip=True)
    content_hash = hashlib.sha256(body_text.encode("utf-8")).hexdigest()

    # Chunking into digestible passages
    words = body_text.split()
    chunks: List[Dict[str, Any]] = []

    if words:
        for i in range(0, len(words), chunk_word_size):
            chunk_words = words[i:i + chunk_word_size]
            chunk_text = " ".join(chunk_words)
            chunks.append({
                "ordinal": len(chunks),
                "text": chunk_text,
                "source_label": f"{title} (Part {len(chunks) + 1})"
            })

    return PageExtractionResult(
        title=title,
        cleaned_text=body_text,
        content_hash=content_hash,
        chunks=chunks,
        links=links,
        parse_state="ok" if body_text else "empty_text"
    )
