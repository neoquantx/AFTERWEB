#!/usr/bin/env bash
set -e

echo "=== AFTERWEB: Initial Setup for macOS ==="

# 1. Check Python
if command -v python3.11 &>/dev/null; then
    PYTHON_CMD="python3.11"
elif command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
else
    echo "Error: Python 3.11+ is required."
    exit 1
fi
echo "Using Python: $($PYTHON_CMD --version)"

# 2. Check Node
if ! command -v node &>/dev/null; then
    echo "Error: Node.js (v20+) is required."
    exit 1
fi
echo "Using Node: $(node --version)"

# 3. Check Ollama
if command -v ollama &>/dev/null; then
    echo "Ollama found: $(ollama --version)"
    echo "Hint: Ensure qwen3:4b is pulled ('ollama pull qwen3:4b')"
else
    echo "Warning: Ollama not found on PATH. Install from https://ollama.com"
fi

# 4. Setup Python Virtual Environment
echo "Setting up Python virtual environment in backend/.venv..."
cd backend
$PYTHON_CMD -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
cd ..

# 5. Setup Frontend Dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo "=== Setup Complete! Run './scripts/dev.sh' to launch development servers ==="
