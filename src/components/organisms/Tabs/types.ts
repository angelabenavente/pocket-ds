import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react";
import type { TabTrigger, TabVariant } from "../../molecules/Tab";

export interface TabsContextValue {
  activeValue: string;
  baseId: string;
  selectValue: (value: string) => void;
  variant: TabVariant;
}

interface ControlledTabsRootProps {
  value: string;
  defaultValue?: never;
  onValueChange: (value: string) => void;
}

interface UncontrolledTabsRootProps {
  value?: never;
  defaultValue: string;
  onValueChange?: (value: string) => void;
}

type TabsRootStateProps = ControlledTabsRootProps | UncontrolledTabsRootProps;

export type TabsRootProps = Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> &
  TabsRootStateProps & {
    variant?: TabVariant;
  };

interface LabelledBy {
  "aria-label"?: never;
  "aria-labelledby": string;
}

interface Labelled {
  "aria-label": string;
  "aria-labelledby"?: never;
}

export type TabsListProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "aria-label" | "aria-labelledby" | "aria-orientation" | "role"
> &
  (Labelled | LabelledBy);

export interface TabsTabProps
  extends Omit<
    ComponentPropsWithoutRef<typeof TabTrigger>,
    | "aria-controls"
    | "aria-selected"
    | "id"
    | "isSelected"
    | "onSelect"
    | "role"
    | "tabIndex"
    | "variant"
  > {
  value: string;
}

export interface TabsPanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "aria-labelledby" | "hidden" | "id" | "role"> {
  value: string;
  children: ReactNode;
}
