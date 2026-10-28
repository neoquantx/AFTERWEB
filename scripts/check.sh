#!/usr/bin/env bash
set -e

echo "=== Running AFTERWEB Verification & Quality Checks ==="

# 1. Backend tests
if [ -d "backend/.venv" ]; then
    echo "[1/3] Running backend tests with pytest..."
    source backend/.venv/bin/activate
    pytest backend/tests -v
else
    echo "[1/3] Skipping backend tests (backend/.venv not found; run setup first)"
fi

# 2. Frontend typecheck & build
echo "[2/3] Checking frontend build..."
npm run build --prefix frontend

# 3. Archive pack validation
if [ -d "backend/.venv" ] && [ -f "data/local/afterweb.db" ]; then
    echo "[3/3] Validating local archive pack..."
    source backend/.venv/bin/activate
    python backend/scripts/validate_pack.py
else
    echo "[3/3] Skipping pack validation (pack not yet created)"
fi

echo "=== All active checks passed! ==="
