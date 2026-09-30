import type { SpacingDoc } from "../../data/foundations.data";

export type SpacingTableLabels = {
  name: string;
  primitiveOnly: string;
  scale: string;
  token: string;
  value: string;
};

export type SpacingTableProps = {
  items: SpacingDoc[];
  labels: SpacingTableLabels;
};
