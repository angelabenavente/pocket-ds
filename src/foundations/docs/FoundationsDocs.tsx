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
      <Text variant="heading-m" label={colors.title} />
      <Text variant="body-s" label={colors.intro} />
      <Text variant="heading-s" label={colors.semanticTitle} />
      <Text variant="body-s" label={colors.semanticIntro} />
      <ColorTable
        caption={colors.semanticCaption}
        labels={colors.columns}
        rows={semanticColors.map((color) => localizeColor(color, copy))}
      />
      <Text variant="heading-s" label={colors.reservedTitle} />
      <Text variant="body-s" label={colors.reservedIntro} />
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
      <Text variant="heading-m" label={typography.title} />
      <Text variant="body-s" label={typography.intro} />
      <Text variant="body-s" label={typography.usage} />
      <TypographyTable
        labels={typography.columns}
        rows={typographyStyles.map((row) => localizeTypography(row, copy))}
      />
      <Text variant="body-s" label={typography.presets} />
    </>
  );
}

export function SpacingDocs() {
  const copy = useStoryCopy();
  const spacing = copy.foundations.spacing;

  return (
    <>
      <Text variant="heading-m" label={spacing.title} />
      <Text variant="body-s" label={spacing.intro} />
      <SpacingTable
        items={spacingScale}
        labels={{ ...spacing.columns, primitiveOnly: spacing.primitiveOnly }}
      />
      <Text variant="body-s" label={spacing.note} />
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
      <Text variant="heading-m" label={content.title} />
      <Text variant="body-s" label={content.intro} />
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
      <Text variant="body-s" label={content.upcoming} />
    </>
  );
}
