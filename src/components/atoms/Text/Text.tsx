import cn from "classnames";
import type { TextElement, TextProps, TextVariant } from "./types";

const defaultElements: Record<TextVariant, TextElement> = {
  "body-m": "p",
  "body-s": "p",
  "button-m": "span",
  "button-s": "span",
  "heading-m": "h1",
  "heading-s": "h2",
};

export function Text(props: TextProps) {
  const { as, children, className, variant = "body-m", ...textProps } = props;
  const Element = as ?? defaultElements[variant];

  return (
    <Element {...textProps} className={cn(variant, className)}>
      {children}
    </Element>
  );
}
