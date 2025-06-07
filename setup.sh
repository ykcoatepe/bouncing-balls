#!/usr/bin/env bash
set -euo pipefail

# Verify that Node.js is installed and its major version is at least 18.
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js not found. Please install Node.js 18 or newer." >&2
  exit 1
fi

NODE_MAJOR=$(node -e 'console.log(process.versions.node.split(".")[0])')
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "Node.js 18 or newer is required (found $(node --version))." >&2
  exit 1
fi

# If nvm is available, use the version from .nvmrc.
if command -v nvm >/dev/null 2>&1 && [[ -f .nvmrc ]]; then
  nvm install
  nvm use
fi

# Install project dependencies.
npm install

echo "Setup complete."
echo "To start the dev server, run: npm run dev"
