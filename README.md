# Pocket DS

[![npm downloads](https://img.shields.io/npm/dt/pocket-ds?label=downloads)](https://www.npmjs.com/package/pocket-ds)

Accessible Tabs, Badge, and Text components, with shared tokens.

## How to install

React, React DOM, and Sass are required. Inter is the typeface used by the tokens. The package does not ship the font files, so load weights 400 and 700 yourself. `@fontsource/inter` is one way to do that. Consumers need Node 24.

```bash
pnpm add pocket-ds react react-dom sass
pnpm add @fontsource/inter
```

```bash
npm install pocket-ds react react-dom sass
npm install @fontsource/inter
```

If the app already has React and React DOM, do not install them again: add `pocket-ds`, `sass`, and `@fontsource/inter` only. The package expects React 19. On React 18, append `--legacy-peer-deps` to the npm command. Sass has to be installed because the styles are published as Sass, not as built CSS.

Import the fonts next to your other global styles, for example in `src/main.tsx`.

```tsx
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-700.css";
```

Import the library and start using its components.

```tsx
import "pocket-ds/styles";
import { Badge, Tabs, Text } from "pocket-ds";
```

`import "pocket-ds/styles"` includes its type declaration. If TypeScript says that side-effect import has no types, add `declare module "pocket-ds/styles";` to a `.d.ts` file in the app.

`Tabs` variants are `underline` and `pill`. Alignment is `left`, `center`, or `right`. A tab can be selected, disabled, or hovered. Hover and active are CSS states. `Badge` variants are `neutral`, `positive`, and `negative`. `Text` variants are `body-m`, `body-s`, `heading-m`, `heading-s`, `button-m`, and `button-s`.

To work on this repository, see [DEVELOPMENT.md](DEVELOPMENT.md).

Made with love by [Angie](https://github.com/angelabenavente) <3
