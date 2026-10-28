from app.services.retrieval import clean_fts_query


def test_clean_fts_query():
    raw = "What is Space Jam 1996????"
    cleaned = clean_fts_query(raw)
    assert '"Space"*' in cleaned
    assert '"Jam"*' in cleaned
    assert '"What"*' not in cleaned
    assert "?" not in cleaned


def test_clean_fts_query_empty():
    assert clean_fts_query("    !!!  ") == ""
