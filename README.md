# Pocket DS

Accessible Tabs, Badge, and Text components, with shared tokens and Storybook docs.

## Install and run

Requires Node.js 24 or newer (`see .nvmrc`). Use `nvm use` in the project root when available.

```bash
pnpm install
pnpm dev
pnpm storybook
```

Storybook listens on http://localhost:6006/. Run `pnpm storybook`, not `pnpm run storybook dev`.

## Use the package

The public components are `Tabs`, `Badge`, and `Text`. Install the package with React, React DOM, and Sass, and load Inter at weights 400 and 700.

```bash
pnpm add pocket-ds react react-dom sass
pnpm add @fontsource/inter
```

```tsx
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-700.css";
import "pocket-ds/styles";
import { Badge, Tabs, Text } from "pocket-ds";
```

`Tabs` variants are `underline` and `pill`. Alignment is `left`, `center`, or `right`. A tab can be selected, disabled, or hovered. Hover and active are CSS states. `Badge` variants are `neutral`, `positive`, and `negative`. `Text` variants are `body-m`, `body-s`, `heading-m`, `heading-s`, `button-m`, and `button-s`. The Storybook introduction shows the install steps, the published version, and the version deployed on the site.

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

`pnpm test` runs the Vitest suites for Badge, Tabs, and Text.

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
