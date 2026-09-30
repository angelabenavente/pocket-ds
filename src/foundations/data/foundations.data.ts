import { foundationValues } from "./foundations.values.generated";

const colorValue = (name: keyof typeof foundationValues) => foundationValues[name].toUpperCase();

export type ColorDoc = {
  title: string;
  token: string;
  value: string;
  source?: string;
  description: string;
};

export type SpacingDoc = {
  name: string;
  value: string;
  token?: string;
  inTokens: boolean;
};

export const semanticColors: ColorDoc[] = [
  {
    title: "Text default",
    token: "--color-text-default",
    value: colorValue("color-neutral-900"),
    source: "$color-neutral-900",
    description: "Default color for text and icons.",
  },
  {
    title: "Text on emphasis",
    token: "--color-text-on-emphasis",
    value: colorValue("color-foundation-white"),
    source: "$color-foundation-white",
    description: "Text and icons placed on emphasized surfaces.",
  },
  {
    title: "Surface emphasis",
    token: "--color-surface-emphasis",
    value: colorValue("color-neutral-900"),
    source: "$color-neutral-900",
    description: "Selected tab and other emphasized surfaces.",
  },
  {
    title: "Surface emphasis hover",
    token: "--color-surface-emphasis-hover",
    value: colorValue("color-neutral-800"),
    source: "$color-neutral-800",
    description: "Selected pill background on hover.",
  },
  {
    title: "Surface emphasis active",
    token: "--color-surface-emphasis-active",
    value: colorValue("color-neutral-700"),
    source: "$color-neutral-700",
    description: "Selected pill background while pressed.",
  },
  {
    title: "Surface subtle",
    token: "--color-surface-subtle",
    value: colorValue("color-surface-subtle"),
    source: "$color-surface-subtle",
    description: "Unselected pill background on hover.",
  },
  {
    title: "Surface positive",
    token: "--color-surface-positive",
    value: colorValue("color-badge-positive"),
    source: "$color-badge-positive",
    description: "Positive badge background.",
  },
  {
    title: "Surface negative",
    token: "--color-surface-negative",
    value: colorValue("color-badge-negative"),
    source: "$color-badge-negative",
    description: "Negative badge background.",
  },
  {
    title: "Border default",
    token: "--color-border-default",
    value: colorValue("color-border-subtle"),
    source: "$color-border-subtle",
    description: "Default borders and dividers.",
  },
  {
    title: "Border outline focus",
    token: "--color-border-outline-focus",
    value: colorValue("color-neutral-900"),
    source: "$color-neutral-900",
    description: "Outline border when a control has keyboard focus.",
  },
  {
    title: "Focus ring",
    token: "--color-focus-ring",
    value: colorValue("color-foundation-black"),
    source: "$color-foundation-black",
    description: "Visible keyboard focus indicator.",
  },
];

export const reservedPrimitiveColors: ColorDoc[] = [
  {
    title: "Border muted",
    token: "$color-border-muted",
    value: colorValue("color-border-muted"),
    description: "Hover and active borders, including tab underlines.",
  },
  {
    title: "Surface muted",
    token: "$color-surface-muted",
    value: colorValue("color-surface-muted"),
    description: "Neutral badges and active pill backgrounds.",
  },
];

const spacingNames = [
  ["4XS", "4xs"],
  ["3XS", "3xs"],
  ["2XS", "2xs"],
  ["XS", "xs"],
  ["S", "s"],
  ["M", "m"],
  ["L", "l"],
  ["XL", "xl"],
  ["2XL", "2xl"],
] as const;

export const spacingScale: SpacingDoc[] = spacingNames.map(([name, suffix]) => ({
  name,
  value: foundationValues[`space-${suffix}`],
  token: `--space-${suffix}`,
  inTokens: true,
}));

export type TypographyStyleDoc = {
  id: "heading-m" | "heading-s" | "body-m" | "body-s" | "button-m" | "button-s";
  name: string;
  description: string;
  fontFamily: string;
  fontFamilyBackups: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  token: string;
};

const bodyFontFamily = `$font-family-base (${foundationValues["font-family-base"]})`;
const bodyFontFamilyBackups = `$font-family-base-backups (${foundationValues["font-family-base-backups"]})`;
const headingFontFamily = `$font-family-custom (${foundationValues["font-family-custom"]})`;
const headingFontFamilyBackups = `$font-family-custom-backups (${foundationValues["font-family-custom-backups"]})`;
const bodyLineHeightPercent = `${Number(foundationValues["line-height-body"]) * 100}%`;

const bodyLineHeight = (fontSize: "font-size-body-m" | "font-size-body-s") => {
  const size = Number.parseFloat(foundationValues[fontSize]);
  const lineHeight = Number(foundationValues["line-height-body"]);
  return `${bodyLineHeightPercent} (${size * lineHeight}px)`;
};

export const typographyStyles: TypographyStyleDoc[] = [
  {
    id: "heading-m",
    name: "Heading M",
    description:
      "Invented for Storybook documentation page headings; not part of the official specification.",
    fontFamily: headingFontFamily,
    fontFamilyBackups: headingFontFamilyBackups,
    fontSize: foundationValues["font-size-heading-m"],
    lineHeight: foundationValues["line-height-heading-m"],
    fontWeight: `Bold (${foundationValues["font-weight-emphasis"]})`,
    token: "heading-m",
  },
  {
    id: "heading-s",
    name: "Heading S",
    description:
      "Invented for Storybook documentation section headings; not part of the official specification.",
    fontFamily: headingFontFamily,
    fontFamilyBackups: headingFontFamilyBackups,
    fontSize: foundationValues["font-size-heading-s"],
    lineHeight: foundationValues["line-height-heading-s"],
    fontWeight: `Bold (${foundationValues["font-weight-emphasis"]})`,
    token: "heading-s",
  },
  {
    id: "body-m",
    name: "Body M",
    description: "Default text for paragraphs and interface content.",
    fontFamily: bodyFontFamily,
    fontFamilyBackups: bodyFontFamilyBackups,
    fontSize: foundationValues["font-size-body-m"],
    lineHeight: bodyLineHeight("font-size-body-m"),
    fontWeight: `Regular (${foundationValues["font-weight-regular"]})`,
    token: "body-m",
  },
  {
    id: "body-s",
    name: "Body S",
    description: "Secondary text for compact interfaces.",
    fontFamily: bodyFontFamily,
    fontFamilyBackups: bodyFontFamilyBackups,
    fontSize: foundationValues["font-size-body-s"],
    lineHeight: bodyLineHeight("font-size-body-s"),
    fontWeight: `Regular (${foundationValues["font-weight-regular"]})`,
    token: "body-s",
  },
  {
    id: "button-m",
    name: "Button M",
    description: "Interactive labels, including tabs.",
    fontFamily: bodyFontFamily,
    fontFamilyBackups: bodyFontFamilyBackups,
    fontSize: foundationValues["font-size-body-m"],
    lineHeight: bodyLineHeight("font-size-body-m"),
    fontWeight: `Bold (${foundationValues["font-weight-emphasis"]})`,
    token: "button-m",
  },
  {
    id: "button-s",
    name: "Button S",
    description: "Compact interactive labels.",
    fontFamily: bodyFontFamily,
    fontFamilyBackups: bodyFontFamilyBackups,
    fontSize: foundationValues["font-size-body-s"],
    lineHeight: bodyLineHeight("font-size-body-s"),
    fontWeight: `Bold (${foundationValues["font-weight-emphasis"]})`,
    token: "button-s",
  },
];

export const breakpoints = {
  mobileMax: foundationValues["mobile-max"],
  sassVariable: "$mobile-max",
  mixin: "above-mobile",
};

export const breakpointRows = [
  {
    figma: "Mobile True",
    viewport: `≤ ${breakpoints.mobileMax}`,
    sass: "Base styles (no media query)",
  },
  {
    figma: "Mobile Off",
    viewport: `> ${breakpoints.mobileMax}`,
    sass: `@include bkp.${breakpoints.mixin}`,
  },
];
