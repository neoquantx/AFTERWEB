-- AFTERWEB SQLite Schema
PRAGMA foreign_keys = ON;

-- Sites (Neighborhoods / Districts)
CREATE TABLE IF NOT EXISTS sites (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    domain TEXT NOT NULL,
    era_label TEXT NOT NULL,
    description TEXT NOT NULL,
    source_note TEXT,
    district_color TEXT DEFAULT '#E5AE55',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Captures (Dated Archive Snapshots)
CREATE TABLE IF NOT EXISTS captures (
    id TEXT PRIMARY KEY,
    site_id TEXT NOT NULL,
    original_url TEXT NOT NULL,
    archive_url TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    status_code INTEGER,
    mime_type TEXT,
    content_hash TEXT,
    fetch_state TEXT NOT NULL DEFAULT 'pending', -- 'captured', 'alternate_capture', 'not_found_in_query', 'lookup_failed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (site_id) REFERENCES sites(id) ON DELETE CASCADE
);

-- Pages (Extracted HTML pages)
CREATE TABLE IF NOT EXISTS pages (
    id TEXT PRIMARY KEY,
    site_id TEXT NOT NULL,
    capture_id TEXT NOT NULL,
    title TEXT NOT NULL,
    canonical_url TEXT NOT NULL,
    text TEXT NOT NULL,
    parse_state TEXT NOT NULL DEFAULT 'ok', -- 'ok', 'empty_text', 'blocked_or_unavailable', 'parse_error'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (site_id) REFERENCES sites(id) ON DELETE CASCADE,
    FOREIGN KEY (capture_id) REFERENCES captures(id) ON DELETE CASCADE
);

-- Chunks (Text units for lexical retrieval and source citations)
CREATE TABLE IF NOT EXISTS chunks (
    id TEXT PRIMARY KEY,
    page_id TEXT NOT NULL,
    ordinal INTEGER NOT NULL,
    text TEXT NOT NULL,
    char_start INTEGER,
    char_end INTEGER,
    source_label TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
);

-- FTS5 Full-Text Search Virtual Table
CREATE VIRTUAL TABLE IF NOT EXISTS chunk_fts USING fts5(
    text,
    source_label,
    content='chunks',
    content_rowid='rowid'
);

-- Triggers to keep FTS5 synchronized with chunks table
CREATE TRIGGER IF NOT EXISTS chunks_ai AFTER INSERT ON chunks BEGIN
    INSERT INTO chunk_fts(rowid, text, source_label) VALUES (new.rowid, new.text, new.source_label);
END;

CREATE TRIGGER IF NOT EXISTS chunks_ad AFTER DELETE ON chunks BEGIN
    INSERT INTO chunk_fts(chunk_fts, rowid, text, source_label) VALUES('delete', old.rowid, old.text, old.source_label);
END;

CREATE TRIGGER IF NOT EXISTS chunks_au AFTER UPDATE ON chunks BEGIN
    INSERT INTO chunk_fts(chunk_fts, rowid, text, source_label) VALUES('delete', old.rowid, old.text, old.source_label);
    INSERT INTO chunk_fts(rowid, text, source_label) VALUES (new.rowid, new.text, new.source_label);
END;

-- Link Edges (Observed Hyperlinks & Ghost Plots)
CREATE TABLE IF NOT EXISTS link_edges (
    id TEXT PRIMARY KEY,
    source_page_id TEXT NOT NULL,
    anchor_text TEXT NOT NULL,
    target_url TEXT NOT NULL,
    target_site_id TEXT,
    edge_type TEXT NOT NULL DEFAULT 'observed', -- 'observed', 'inferred'
    lookup_state TEXT NOT NULL DEFAULT 'not_checked', -- 'captured', 'alternate_capture', 'not_found_in_query', 'lookup_failed', 'not_checked'
    lookup_range TEXT,
    evidence_capture_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_page_id) REFERENCES pages(id) ON DELETE CASCADE,
    FOREIGN KEY (target_site_id) REFERENCES sites(id) ON DELETE SET NULL,
    FOREIGN KEY (evidence_capture_id) REFERENCES captures(id) ON DELETE SET NULL
);
