import type { ComponentPropsWithoutRef, ReactNode } from "react";

export const textVariants = [
  "heading-m",
  "heading-s",
  "body-m",
  "body-s",
  "button-m",
  "button-s",
] as const;

export type TextVariant = (typeof textVariants)[number];

export type TextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type TextOwnProps = {
  as?: TextElement;
  children?: ReactNode;
  className?: string;
  key?: string;
  variant?: TextVariant;
};

export type TextProps = TextOwnProps & Omit<ComponentPropsWithoutRef<"p">, keyof TextOwnProps>;
