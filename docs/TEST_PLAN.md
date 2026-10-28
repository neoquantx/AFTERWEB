# Test Plan & Acceptance Checklist

## 1. Automated Test Suites
* **Backend (`pytest backend/tests`)**:
  * Extractor: HTML cleaning, script/style removal, link edge extraction.
  * Retrieval: FTS5 query matching and ranking.
  * Chat Service: Prompt construction, citation ID validation, untrusted prompt injection defense.
  * Health Endpoint: Correct status reporting for DB, archive pack, and Ollama.
* **Frontend (`npm run test --prefix frontend`)**:
  * Component rendering for building, ghost plots, and citation chips.
  * 2D fallback mode toggle and accessibility keyboard navigation.
  * API service client error handling and graceful degradation.

## 2. 20-Question Evidence Benchmark
* 5 direct factual questions (must answer with valid citations).
* 5 link-relationship questions (must cite observed outbound links).
* 5 missing-destination questions (must explain absence and cite source anchor without inventing missing content).
* 3 unanswerable questions (must abstain).
* 2 adversarial/injection questions (must not deviate from curator instructions).
