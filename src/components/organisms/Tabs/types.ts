import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react";
import type { TabTrigger, TabVariant } from "../../molecules/Tab";

export interface TabsContextValue {
  activeValue: number;
  baseId: string;
  selectValue: (value: number) => void;
  variant: TabVariant;
}

interface ControlledTabsProps {
  value: number;
  defaultValue?: never;
  onValueChange: (value: number) => void;
}

interface UncontrolledTabsProps {
  value?: never;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}

type TabsStateProps = ControlledTabsProps | UncontrolledTabsProps;

export const tabsAlignments = ["left", "center", "right"] as const;

export type TabsAlign = (typeof tabsAlignments)[number];

interface LabelledBy {
  "aria-label"?: never;
  "aria-labelledby": string;
}

interface Labelled {
  "aria-label": string;
  "aria-labelledby"?: never;
}

export type TabsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "aria-label" | "className" | "defaultValue" | "onChange"
> &
  TabsStateProps & {
    align?: TabsAlign;
    "aria-label": string;
    children: ReactNode;
    className?: string;
    key?: string;
    variant?: TabVariant;
  };

export type TabsTabProps = Omit<
  ComponentPropsWithoutRef<typeof TabTrigger>,
  | "aria-controls"
  | "aria-selected"
  | "id"
  | "isSelected"
  | "onSelect"
  | "role"
  | "tabIndex"
  | "variant"
> & {
  children: ReactNode;
};

export type TabsListProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "aria-label" | "aria-labelledby" | "aria-orientation" | "role"
> &
  (Labelled | LabelledBy);

export type TabsPanelProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "aria-labelledby" | "hidden" | "id" | "role"
> & {
  children: ReactNode;
  value: number;
};
