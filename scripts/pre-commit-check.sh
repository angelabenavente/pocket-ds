#!/usr/bin/env sh
set -eu

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

node "$ROOT/scripts/generate-foundation-values.mjs"

BIOME="$ROOT/node_modules/.bin/biome"
TSC="$ROOT/node_modules/.bin/tsc"

STAGED="$(git diff --cached --name-only --diff-filter=ACMR || true)"
BIOME_FILES="$(printf '%s\n' "$STAGED" | grep -E '\.(js|jsx|ts|tsx|json|css|md|mdx)$' || true)"

if [ -n "$BIOME_FILES" ]; then
  printf '%s\n' "$BIOME_FILES" | tr '\n' '\0' | xargs -0 "$BIOME" check --no-errors-on-unmatched
else
  echo "pre-commit: no staged Biome targets; skipping lint/format on staged files."
fi

"$TSC" -b
sh "$ROOT/scripts/run-tests-if-present.sh"
