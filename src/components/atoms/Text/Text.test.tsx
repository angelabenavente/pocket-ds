import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./Text";
import type { TextElement, TextVariant } from "./types";

const defaultElements: Record<TextVariant, TextElement> = {
  "body-m": "p",
  "body-s": "p",
  "button-m": "span",
  "button-s": "span",
  "heading-m": "h1",
  "heading-s": "h2",
};

describe("Text", () => {
  describe("rendering", () => {
    it("renders body-m as a paragraph by default", () => {
      render(<Text className="custom-class" label="Regular text" />);

      const text = screen.getByText("Regular text");

      expect(text.tagName).toBe("P");
      expect(text).toHaveClass("body-m", "custom-class");
    });
  });

  describe("variants", () => {
    it.each(Object.entries(defaultElements) as Array<[TextVariant, TextElement]>)(
      "renders %s as %s",
      (variant, element) => {
        render(<Text variant={variant} label={variant} />);

        const text = screen.getByText(variant);

        expect(text.tagName).toBe(element.toUpperCase());
        expect(text).toHaveClass(variant);
      },
    );
  });

  describe("element", () => {
    it.each(["h4", "h5", "h6"] as const)("can render as %s", (element) => {
      render(<Text as={element} label="Heading" />);

      expect(screen.getByText("Heading").tagName).toBe(element.toUpperCase());
    });

    it("uses the requested element instead of the variant default", () => {
      render(<Text as="span" variant="heading-m" label="Section title" />);

      const text = screen.getByText("Section title");

      expect(text.tagName).toBe("SPAN");
      expect(text).toHaveClass("heading-m");
    });
  });
});
