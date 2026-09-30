import { act, cleanup, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FocusRing } from "./FocusRing";

function Harness(props: { borderRadius?: string }) {
  const targetRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={targetRef} type="button">
        Overview
      </button>
      <FocusRing borderRadius={props.borderRadius} targetRef={targetRef} />
    </>
  );
}

describe("FocusRing", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it("portals a ring outside the target when focus is visible", () => {
    render(<Harness />);
    const button = screen.getByRole("button", { name: "Overview" });

    vi.spyOn(button, "matches").mockImplementation((selector) => selector === ":focus-visible");
    vi.spyOn(button, "getBoundingClientRect").mockReturnValue({
      height: 50,
      width: 70,
      top: 215,
      left: 24,
      right: 94,
      bottom: 265,
      x: 24,
      y: 215,
      toJSON: () => ({}),
    });

    act(() => {
      button.dispatchEvent(new FocusEvent("focus"));
    });

    const ring = document.body.querySelector("[aria-hidden='true']");

    expect(ring).toBeInstanceOf(HTMLElement);
    expect(ring).toHaveStyle({
      height: "58px",
      left: "20px",
      top: "211px",
      width: "78px",
    });
    expect(button.contains(ring)).toBe(false);
  });

  it("does nothing when the target ref is empty", () => {
    const targetRef = { current: null };

    render(<FocusRing targetRef={targetRef} />);

    expect(document.body.querySelector("[aria-hidden='true']")).toBeNull();
  });

  it("hides the ring when focus is not visible", () => {
    render(<Harness />);
    const button = screen.getByRole("button", { name: "Overview" });

    vi.spyOn(button, "matches").mockReturnValue(false);
    vi.spyOn(button, "getBoundingClientRect").mockReturnValue({
      height: 50,
      width: 70,
      top: 0,
      left: 0,
      right: 70,
      bottom: 50,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    act(() => {
      button.dispatchEvent(new FocusEvent("focus"));
    });

    expect(document.body.querySelector("[aria-hidden='true']")).toBeNull();
  });

  it("falls back to the default gap when the token is invalid", () => {
    render(<Harness />);
    const button = screen.getByRole("button", { name: "Overview" });

    vi.spyOn(window, "getComputedStyle").mockImplementation(
      () =>
        ({
          getPropertyValue: () => "invalid",
        }) as unknown as CSSStyleDeclaration,
    );
    vi.spyOn(button, "matches").mockImplementation((selector) => selector === ":focus-visible");
    vi.spyOn(button, "getBoundingClientRect").mockReturnValue({
      height: 50,
      width: 70,
      top: 0,
      left: 0,
      right: 70,
      bottom: 50,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    act(() => {
      button.dispatchEvent(new FocusEvent("focus"));
    });

    expect(document.body.querySelector("[aria-hidden='true']")).toBeInstanceOf(HTMLElement);
  });

  it("uses the given corner radius", () => {
    render(<Harness borderRadius="2px" />);
    const button = screen.getByRole("button", { name: "Overview" });

    vi.spyOn(button, "matches").mockImplementation((selector) => selector === ":focus-visible");
    vi.spyOn(button, "getBoundingClientRect").mockReturnValue({
      height: 50,
      width: 70,
      top: 0,
      left: 0,
      right: 70,
      bottom: 50,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });

    act(() => {
      button.dispatchEvent(new FocusEvent("focus"));
    });

    expect(document.body.querySelector("[aria-hidden='true']")).toHaveStyle({
      borderRadius: "2px",
    });
  });
});
