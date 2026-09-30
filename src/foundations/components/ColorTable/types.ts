import type { ColorDoc } from "../../data/foundations.data";

export type ColorTableLabels = {
  name: string;
  preview: string;
  source: string;
  token: string;
  usage: string;
  value: string;
};

export type ColorTableProps = {
  caption: string;
  labels: ColorTableLabels;
  rows: ColorDoc[];
};
