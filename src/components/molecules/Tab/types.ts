import type { ButtonHTMLAttributes } from "react";
import type { BadgeProps } from "../../atoms/Badge";

export type TabVariant = "pill" | "underline";

export type TabBadge = Omit<BadgeProps, "key">;

export interface TabTriggerProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className" | "onSelect" | "type"
  > {
  badge?: TabBadge;
  className?: string;
  isSelected: boolean;
  key?: string;
  label: string;
  onSelect: () => void;
  variant?: TabVariant;
}
