import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type BadgeVariant = "negative" | "neutral" | "positive";

export interface BadgeProps extends Omit<ComponentPropsWithoutRef<"span">, "children"> {
  children: ReactNode;
  variant?: BadgeVariant;
}
