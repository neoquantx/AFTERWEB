#!/usr/bin/env bash
set -e

echo "=== Launching AFTERWEB Development Environment ==="

# Trap cleanup to stop child processes on Ctrl+C
cleanup() {
    echo ""
    echo "Shutting down AFTERWEB services..."
    kill $(jobs -p) 2>/dev/null || true
    exit 0
}
trap cleanup SIGINT SIGTERM EXIT

# 1. Start FastAPI Backend
echo "Starting FastAPI backend on http://127.0.0.1:8000..."
source backend/.venv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000 --app-dir backend &
BACKEND_PID=$!

# 2. Start Vite Frontend
echo "Starting Vite frontend on http://127.0.0.1:5173..."
npm run dev --prefix frontend -- --host 127.0.0.1 &
FRONTEND_PID=$!

# Wait for background services
wait
