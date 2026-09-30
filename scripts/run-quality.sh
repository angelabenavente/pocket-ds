#!/usr/bin/env sh
set -eu

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

"$ROOT/node_modules/.bin/biome" lint . --no-errors-on-unmatched
"$ROOT/node_modules/.bin/biome" format . --no-errors-on-unmatched
"$ROOT/node_modules/.bin/tsc" -b
sh "$ROOT/scripts/run-tests-if-present.sh"
"$ROOT/node_modules/.bin/storybook" build
