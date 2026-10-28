from app.services.extractor import extract_html_content


def test_extractor_extracts_title_and_links():
    sample_html = """
    <html>
      <head><title>My 1996 Cool Page</title></head>
      <body>
        <script>alert("ignore me");</script>
        <h1>Welcome</h1>
        <p>This is a test paragraph with real information.</p>
        <a href="http://example.org/cool-target">Awesome Site</a>
        <a href="relative/path/index.html">Relative Destination</a>
      </body>
    </html>
    """
    res = extract_html_content(sample_html, base_url="http://base.com/home/", page_id="test1")

    assert res.title == "My 1996 Cool Page"
    assert "ignore me" not in res.cleaned_text
    assert len(res.links) == 2
    assert res.links[0].anchor_text == "Awesome Site"
    assert res.links[0].target_url == "http://example.org/cool-target"
    assert res.links[1].target_url == "http://base.com/home/relative/path/index.html"
    assert len(res.chunks) > 0


def test_extractor_handles_empty_html():
    res = extract_html_content("", base_url="http://base.com", page_id="empty")
    assert res.parse_state == "empty_text"
    assert len(res.links) == 0
    assert len(res.chunks) == 0
