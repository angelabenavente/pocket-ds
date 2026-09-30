import type { ButtonHTMLAttributes } from "react";

export type TabVariant = "pill" | "underline";

export interface TabTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect" | "type"> {
  isSelected: boolean;
  onSelect: () => void;
  variant?: TabVariant;
}
