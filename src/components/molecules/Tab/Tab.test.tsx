import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ComponentProps, createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { TabTrigger } from "./Tab";

function renderTab(
  props: Partial<ComponentProps<typeof TabTrigger>> & {
    onSelect?: () => void;
  } = {},
) {
  const onSelect = props.onSelect ?? vi.fn();

  render(
    <div role="tablist">
      <TabTrigger label="Overview" isSelected={false} onSelect={onSelect} {...props} />
    </div>,
  );

  return { onSelect, tab: screen.getByRole("tab", { name: "Overview" }) };
}

describe("TabTrigger", () => {
  it("forwards a callback ref to the button", () => {
    const ref = vi.fn();
    renderTab({ ref });

    const tab = screen.getByRole("tab", { name: "Overview" });

    expect(ref).toHaveBeenCalledWith(tab);
  });

  it("forwards an object ref to the button", () => {
    const ref = createRef<HTMLButtonElement>();
    renderTab({ ref });

    expect(ref.current).toBe(screen.getByRole("tab", { name: "Overview" }));
  });

  it("calls onSelect when clicked unless the event was prevented", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onClick = vi.fn((event) => {
      event.preventDefault();
    });

    renderTab({ onClick, onSelect });
    await user.click(screen.getByRole("tab", { name: "Overview" }));

    expect(onClick).toHaveBeenCalledOnce();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("calls onSelect when click is not prevented", async () => {
    const user = userEvent.setup();
    const { onSelect, tab } = renderTab();

    await user.click(tab);

    expect(onSelect).toHaveBeenCalledOnce();
  });
});
