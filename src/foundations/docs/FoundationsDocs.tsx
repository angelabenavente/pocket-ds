import { Text } from "../../components/atoms/Text";
import { type StoryCopy, useStoryCopy } from "../../storybook/locales";
import { ColorTable } from "../components/ColorTable";
import { SpacingTable } from "../components/SpacingTable";
import { TokenTable } from "../components/TokenTable";
import { TypographyTable } from "../components/TypographyTable/index.ts";
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
      <Text variant="heading-m">{colors.title}</Text>
      <Text variant="body-s">{colors.intro}</Text>
      <Text variant="heading-s">{colors.semanticTitle}</Text>
      <Text variant="body-s">{colors.semanticIntro}</Text>
      <ColorTable
        caption={colors.semanticCaption}
        labels={colors.columns}
        rows={semanticColors.map((color) => localizeColor(color, copy))}
      />
      <Text variant="heading-s">{colors.reservedTitle}</Text>
      <Text variant="body-s">{colors.reservedIntro}</Text>
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
      <Text variant="heading-m">{typography.title}</Text>
      <Text variant="body-s">{typography.intro}</Text>
      <Text variant="body-s">{typography.usage}</Text>
      <TypographyTable
        labels={typography.columns}
        rows={typographyStyles.map((row) => localizeTypography(row, copy))}
      />
      <Text variant="body-s">{typography.presets}</Text>
    </>
  );
}

export function SpacingDocs() {
  const copy = useStoryCopy();
  const spacing = copy.foundations.spacing;

  return (
    <>
      <Text variant="heading-m">{spacing.title}</Text>
      <Text variant="body-s">{spacing.intro}</Text>
      <SpacingTable
        items={spacingScale}
        labels={{ ...spacing.columns, primitiveOnly: spacing.primitiveOnly }}
      />
      <Text variant="body-s">{spacing.note}</Text>
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
      <Text variant="heading-m">{content.title}</Text>
      <Text variant="body-s">{content.intro}</Text>
      <TokenTable
        columns={[
          { header: content.columns.figma, accessor: "figma" },
          { header: content.columns.viewport, accessor: "viewport" },
          { header: content.columns.sass, accessor: "sass", mono: true },
        ]}
        rows={rows}
      />
      <Text variant="body-s">
        {content.variable}: <code>{breakpoints.sassVariable}</code> ={" "}
        <strong>{breakpoints.mobileMax}</strong> {content.inFile}{" "}
        <code>src/styles/_breakpoints.scss</code>.
      </Text>
      <pre>
        <code>{breakpointExample}</code>
      </pre>
      <Text variant="body-s">{content.upcoming}</Text>
    </>
  );
}
