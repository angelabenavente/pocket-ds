# Development

Requires Node.js 24 or newer (see `.nvmrc`). Use `nvm use` in the project root when available.

```bash
pnpm install
pnpm dev
pnpm storybook
```

Storybook listens on http://localhost:6006/. Run `pnpm storybook`, not `pnpm run storybook dev`.

Storybook is deployed from `vercel.json`. The build writes `storybook-static`, and every response sends a content security policy plus the usual security headers.

## Quality checks

Biome handles lint and format checks. There is no Prettier config in this repo.

```bash
pnpm run lint          # Biome lint, check mode
pnpm run format:check  # Biome format, check mode
pnpm run check         # lint + format together
pnpm run typecheck     # TypeScript project references
pnpm test              # Vitest, non-interactive
pnpm run build-storybook
pnpm run quality       # lint, format, types, tests, Storybook build
pnpm run audit         # pnpm audit
pnpm run licenses      # license summary
pnpm run licenses:unknown
```

`pnpm test` runs the Vitest unit suites for Badge, Tabs, Text, and FocusRing.

`pnpm test-storybook` runs component, accessibility, and interaction tests from stories in a real browser (Playwright Chromium). The first run downloads Chromium automatically; you can also run `pnpm exec playwright install chromium` yourself.

Visual regression tests use [Chromatic](https://www.chromatic.com/). The addon is installed (`@chromatic-com/storybook`); connect a free account, then run visual tests from the Storybook testing widget or with `pnpm chromatic` locally (`CHROMATIC_PROJECT_TOKEN` required). To run visual tests in CI, add repository variable `CHROMATIC_ENABLED=true` and secret `CHROMATIC_PROJECT_TOKEN`.

## Test coverage

Coverage measures which component code is exercised by tests. It targets `src/components/**/*.{ts,tsx}` and ignores stories, unit tests, barrel files, and type-only modules.

**In Storybook UI**

1. Open the testing widget at the bottom of the sidebar.
2. Check **Coverage**.
3. Run component tests (watch mode is disabled while coverage is on).
4. Read the summary in the widget; open the linked report at `/coverage/index.html` to inspect covered and uncovered lines per file.

**From the CLI**

| Command | What it measures |
| --- | --- |
| `pnpm test-storybook:coverage` | Stories only (component + a11y tests in the browser) |
| `pnpm test:coverage` | Unit tests **and** stories together (most complete picture) |

Reports are written to `./coverage/`. Open `coverage/index.html` in a browser for the interactive HTML report.

Watermarks in the Storybook widget use Vitest defaults: below 50% is red, 50–79% is orange, 80%+ is green. CI uploads the `coverage/` folder as a workflow artifact from the **Report test coverage** job.

## Pre-commit hook

After `pnpm install`, Husky registers `.husky/pre-commit`. The hook runs `scripts/pre-commit-check.sh`, which:

- runs Biome check on staged files that Biome supports (no auto-fix, no staging)
- runs the full TypeScript build (`tsc -b`)
- skips Vitest while no test files exist

Invoke the hook logic without committing:

```bash
pnpm run precommit
```

Dependency audit and license inventory run in CI, not in the pre-commit hook.

## Continuous integration

GitHub Actions workflow: `.github/workflows/ci.yml`. Separate jobs: **Run lint checks**, **Check code formatting**, **Check TypeScript types**, **Run unit tests**, **Run Storybook tests**, **Report test coverage**, **Run visual tests** (Chromatic, optional), **Build Storybook**, **Audit dependencies**, **Generate license inventory**, and **Check for unknown licenses**. Each installs from `pnpm-lock.yaml` with Node 24 and runs one check.
