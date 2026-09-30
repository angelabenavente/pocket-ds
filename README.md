# Frontend Interview - Design System

Hey 👋

This is the base repository for the home test. The repository is created with `vite` and is empty, but contains some packages already installed, in particular:

- `react`
- `storybook`
- `vitest`

## Install and run

Requires Node.js 24 or newer (`see .nvmrc`). Use `nvm use` in the project root when available.

```bash
pnpm install
pnpm dev
pnpm storybook
```

Storybook listens on http://localhost:6006/. Run `pnpm storybook`, not `pnpm run storybook dev`.

## Quality checks

Biome handles lint and format checks. There is no Prettier config in this repo.

```bash
pnpm run lint          # Biome lint, check mode
pnpm run format:check  # Biome format, check mode
pnpm run check         # lint + format together
pnpm run typecheck     # TypeScript project references
pnpm test              # Vitest, non-interactive (no test files yet)
pnpm run build-storybook
pnpm run quality       # lint, format, types, tests-if-present, Storybook build
pnpm run audit         # pnpm audit
pnpm run licenses      # license summary
pnpm run licenses:unknown
```

There are no component tests yet. `pnpm test` exits with an error until the first `src/**/*.test.*` file exists. CI and `pnpm run quality` skip Vitest until then via `scripts/run-tests-if-present.sh`.

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

GitHub Actions workflow: `.github/workflows/ci.yml`. Separate jobs: **Run lint checks**, **Check code formatting**, **Check TypeScript types**, **Run unit tests**, **Build Storybook**, **Audit dependencies**, **Generate license inventory**, and **Check for unknown licenses**. Each installs from `pnpm-lock.yaml` with Node 24 and runs one check.

## Figma file

The figma file of the home test is available [here](https://www.figma.com/design/OclakAGLSXDoMKLFvwLNMP/%F0%9F%92%BB-Design-System-Home-Test---Tabs-Component?node-id=0-1&t=4pG7NN6HKxgxroDz-1).
