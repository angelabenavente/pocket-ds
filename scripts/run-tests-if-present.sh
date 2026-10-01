#!/usr/bin/env sh
set -eu

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VITEST="$ROOT/node_modules/.bin/vitest"

if find "$ROOT/src" -name '*.test.*' -print -quit 2>/dev/null | grep -q .; then
  "$VITEST" run --project=unit
else
  echo "No test files under src yet; skipping vitest."
fi
