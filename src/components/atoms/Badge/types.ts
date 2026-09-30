import type { ComponentPropsWithoutRef } from "react";

export type BadgeVariant = "negative" | "neutral" | "positive";

export interface BadgeProps
  extends Omit<ComponentPropsWithoutRef<"span">, "children" | "className"> {
  className?: string;
  key?: string;
  label: string;
  variant?: BadgeVariant;
}
