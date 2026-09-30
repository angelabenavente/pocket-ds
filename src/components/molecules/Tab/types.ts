import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { BadgeProps } from "../../atoms/Badge";

export type TabVariant = "pill" | "underline";

export interface TabBadge extends Omit<BadgeProps, "children" | "content"> {
  content: ReactNode;
}

export interface TabTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect" | "type"> {
  badge?: TabBadge;
  isSelected: boolean;
  onSelect: () => void;
  variant?: TabVariant;
}
