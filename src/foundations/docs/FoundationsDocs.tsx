import { type StoryCopy, useStoryCopy } from "../../storybook/locales";
import { ColorTable } from "../components/ColorTable";
import { SpacingTable } from "../components/SpacingTable";
import { TokenTable } from "../components/TokenTable";
import { TypographyTable } from "../components/TypographyTable";
import {
  breakpointRows,
  breakpoints,
  type ColorDoc,
  reservedPrimitiveColors,
  semanticColors,
  spacingScale,
  type TypographyStyleDoc,
  typographyStyles,
} from "../data/foundations.data";

type ColorItemKey = keyof StoryCopy["foundations"]["colors"]["items"];

const breakpointExample = `@use "../../styles/breakpoints" as bkp;

.example {
  padding: var(--space-2xs);

  @include bkp.above-mobile {
    padding: var(--space-xs);
  }
}`;

function localizeColor(color: ColorDoc, copy: StoryCopy): ColorDoc {
  const item = copy.foundations.colors.items[color.token as ColorItemKey];

  if (!item) {
    return color;
  }

  return {
    ...color,
    title: item.title,
    description: item.description,
  };
}

function localizeTypography(row: TypographyStyleDoc, copy: StoryCopy): TypographyStyleDoc {
  const weightValue = row.fontWeight.match(/\(([^)]+)\)/)?.[1] ?? "";
  const weightName = row.id.startsWith("body")
    ? copy.foundations.typography.regular
    : copy.foundations.typography.bold;

  return {
    ...row,
    description: copy.foundations.typography.styles[row.id],
    fontWeight: `${weightName} (${weightValue})`,
  };
}

export function ColorsDocs() {
  const copy = useStoryCopy();
  const colors = copy.foundations.colors;

  return (
    <>
      <h1>{colors.title}</h1>
      <p>{colors.intro}</p>
      <h2>{colors.semanticTitle}</h2>
      <p>{colors.semanticIntro}</p>
      <ColorTable
        caption={colors.semanticCaption}
        labels={colors.columns}
        rows={semanticColors.map((color) => localizeColor(color, copy))}
      />
      <h2>{colors.reservedTitle}</h2>
      <p>{colors.reservedIntro}</p>
      <ColorTable
        caption={colors.reservedCaption}
        labels={colors.columns}
        rows={reservedPrimitiveColors.map((color) => localizeColor(color, copy))}
      />
    </>
  );
}

export function TypographyDocs() {
  const copy = useStoryCopy();
  const typography = copy.foundations.typography;

  return (
    <>
      <h1>{typography.title}</h1>
      <p>{typography.intro}</p>
      <p>{typography.usage}</p>
      <TypographyTable
        labels={typography.columns}
        rows={typographyStyles.map((row) => localizeTypography(row, copy))}
      />
      <p>{typography.presets}</p>
    </>
  );
}

export function SpacingDocs() {
  const copy = useStoryCopy();
  const spacing = copy.foundations.spacing;

  return (
    <>
      <h1>{spacing.title}</h1>
      <p>{spacing.intro}</p>
      <SpacingTable
        items={spacingScale}
        labels={{ ...spacing.columns, primitiveOnly: spacing.primitiveOnly }}
      />
      <p>{spacing.note}</p>
    </>
  );
}

export function BreakpointsDocs() {
  const copy = useStoryCopy();
  const content = copy.foundations.breakpoints;
  const rows = breakpointRows.map((row) =>
    row.sass.startsWith("@include") ? row : { ...row, sass: content.baseStyles },
  );

  return (
    <>
      <h1>{content.title}</h1>
      <p>{content.intro}</p>
      <TokenTable
        columns={[
          { header: content.columns.figma, accessor: "figma" },
          { header: content.columns.viewport, accessor: "viewport" },
          { header: content.columns.sass, accessor: "sass", mono: true },
        ]}
        rows={rows}
      />
      <p>
        {content.variable}: <code>{breakpoints.sassVariable}</code> ={" "}
        <strong>{breakpoints.mobileMax}</strong> {content.inFile}{" "}
        <code>src/styles/_breakpoints.scss</code>.
      </p>
      <pre>
        <code>{breakpointExample}</code>
      </pre>
      <p>{content.upcoming}</p>
    </>
  );
}
