export interface CitationData {
  id: string;
  chunk_id: string;
  page_title: string;
  capture_timestamp: string;
  original_url: string;
  archive_url: string;
  excerpt: string;
}

export interface EvidenceSearchResponse {
  query: string;
  results_count: number;
  citations: CitationData[];
}
