import type { ButtonHTMLAttributes } from "react";

export interface TabTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect" | "type"> {
  isSelected: boolean;
  onSelect: () => void;
}
