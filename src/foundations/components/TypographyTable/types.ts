import type { TypographyStyleDoc } from "../../data/foundations.data";

export type TypographyTableLabels = {
  description: string;
  fontFamily: string;
  fontFamilyBackups: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  token: string;
  type: string;
};

export type TypographyTableProps = {
  labels: TypographyTableLabels;
  rows: TypographyStyleDoc[];
};
