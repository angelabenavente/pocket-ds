import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./Badge";
import type { BadgeVariant } from "./types";

describe("Badge", () => {
  // Rendering: content, native attributes, and the default visual contract.
  describe("rendering", () => {
    it("renders content with the neutral variant by default", () => {
      render(
        <Badge className="custom-class" aria-label="Notifications">
          3
        </Badge>,
      );

      const badge = screen.getByLabelText("Notifications");

      expect(badge).toHaveTextContent("3");
      expect(badge).toHaveAttribute("data-variant", "neutral");
      expect(badge).toHaveClass("custom-class");
    });
  });

  // Variants: every official visual option is exposed through the public API.
  describe("variants", () => {
    it.each<BadgeVariant>(["neutral", "positive", "negative"])(
      "supports the %s variant",
      (variant) => {
        render(<Badge variant={variant}>{variant}</Badge>);

        expect(screen.getByText(variant)).toHaveAttribute("data-variant", variant);
      },
    );
  });
});
