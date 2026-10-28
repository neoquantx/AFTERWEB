# AFTERWEB: The Dead Internet City
### Missing-Link Archaeology in 3D & Local Evidence-Bound AI

> **Walk through a city built from the hyperlinks of the early web.**  
> Follow real archival evidence into places that survived, places that changed, and places the archive can no longer find. A local open-weight model helps interpret the evidence, but never invents history to fill a gap.

---

## 🌟 The Signature Experience

1. **Observed Routes**: Every physical street and connection in the 3D city corresponds to a real `<a>` tag extracted from historical web captures.
2. **Ghost Plots**: When a target URL yields no capture in the checked query, it manifests as a glowing empty lot displaying its original anchor text and target URL—never a fabricated webpage.
3. **Evidence-Bound Local AI**: Ask questions about historical sites or missing links. A local Qwen3 model running through Ollama references local SQLite chunks and generates verified `[E#]` citations. If evidence is lacking, it abstains.
4. **100% Local & Offline-Ready**: After the initial archive pack creation and model download, everything (3D map, full-text lexical search, and AI Q&A) runs completely offline on your machine with zero cloud telemetry.

---

## 🏗️ Architecture

* **Frontend**: React 19 + TypeScript + Vite + Three.js / React Three Fiber v9 + Drei + Zustand + 2D Accessible Mode.
* **Backend**: Python 3.11 + FastAPI + SQLite with FTS5 lexical full-text index.
* **AI Engine**: Local Ollama loopback (`http://127.0.0.1:11434`) running `qwen3:4b` (or `qwen3:1.7b`).

---

## 🚀 Quick Start

### 1. Prerequisites
* **Node.js**: v20+ LTS
* **Python**: 3.11+
* **Ollama**: [ollama.com](https://ollama.com) with `qwen3:4b` pulled:
  ```bash
  ollama pull qwen3:4b
  ```

### 2. Setup Services
```bash
# Setup backend environment
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cd ..

# Setup frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Ingest Curated Archive Pack
```bash
source backend/.venv/bin/activate
python backend/scripts/build_archive_pack.py
python backend/scripts/validate_pack.py
```

### 4. Run Development Servers
* **Backend**:
  ```bash
  source backend/.venv/bin/activate
  uvicorn app.main:app --reload --host 127.0.0.1 --port 8000 --app-dir backend
  ```
* **Frontend**:
  ```bash
  cd frontend
  npm run dev
  ```
Open `http://localhost:5173` in your browser.

---

## 📁 Repository Structure

```text
afterweb/
├── docs/                     # PRD, Architecture, Test Plan, Demo Script
├── data/
│   ├── seed_manifest.json    # Curated root sites & historical scopes
│   ├── fixtures/             # Test HTML captures & mock responses
│   └── local/                # Local SQLite DB & search index (gitignored)
├── frontend/                 # Vite + React 19 + Three.js / R3F + Zustand
├── backend/                  # FastAPI + SQLite FTS5 + Ollama Client
├── scripts/                  # Setup, Dev launcher & Verification scripts
└── README.md
```

---

## 📄 License & Attribution
* Application source code is released under the [MIT License](LICENSE).
* See [NOTICE.md](NOTICE.md) for model licensing and archive attribution.
