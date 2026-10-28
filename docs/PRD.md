# Product Requirements Document (PRD)

## Project: AFTERWEB
**Target**: Local-first Web Archaeology and Evidence-Bound Local AI

### 1. Goals & Non-Goals
* **Goal 1**: Under 60 seconds to first historical discovery.
* **Goal 2**: Spatial exploration of 3 curated early-web neighborhoods where physical street routes are generated strictly from observed hyperlinks (`<a>` tags) in dated snapshots.
* **Goal 3**: Clear distinction between 3 destination states:
  * `captured`: Available snapshot in archive.
  * `alternate_capture`: Snapshot captured at a different date.
  * `not_found_in_query`: Ghost plot (empty lot) with verified anchor text and target URL.
* **Goal 4**: Local evidence-bound AI assistant using Qwen3 via Ollama that cites source excerpts (`[E1]`) and abstains when evidence is missing.
* **Non-Goal**: Whole-web crawler, fake site reconstruction, hallucinated missing content, or cloud LLM endpoints.

### 2. Functional Requirements
* **FR-01**: Readiness check for FastAPI, SQLite FTS5, Ollama, and model availability.
* **FR-02**: 3D interactive city map with 2D accessible list/graph fallback.
* **FR-03**: Routes derived only from verified outbound links.
* **FR-04**: Ghost plot representation for uncaptured destinations.
* **FR-05**: Source & link provenance inspector (URLs, timestamps, excerpts).
* **FR-06**: Evidence Q&A bounded strictly to retrieved excerpts.
* **FR-07**: Citation validation preventing hallucinated references.
* **FR-08**: Graceful degradation when model/Ollama is offline.
* **FR-09**: Full offline functionality once archive pack is built.
* **FR-10**: Keyboard navigation, focus states, and reduced-motion support.
