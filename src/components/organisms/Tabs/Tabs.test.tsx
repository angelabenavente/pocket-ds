import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tabs } from "./Tabs";

function UncontrolledTabs(props: {
  defaultValue?: string;
  label?: string;
  onValueChange?: (value: string) => void;
}) {
  const { defaultValue = "overview", label = "Account sections", onValueChange } = props;

  return (
    <Tabs.Root defaultValue={defaultValue} onValueChange={onValueChange}>
      <Tabs.List aria-label={label}>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="activity" disabled>
          Activity
        </Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">Overview content</Tabs.Panel>
      <Tabs.Panel value="activity">Activity content</Tabs.Panel>
      <Tabs.Panel value="settings">Settings content</Tabs.Panel>
    </Tabs.Root>
  );
}

describe("Tabs", () => {
  // Accessibility: semantic roles, ARIA state, and tab-panel relationships.
  describe("accessibility and semantics", () => {
    it("connects the selected tab with its visible panel", () => {
      render(<UncontrolledTabs />);

      const selectedTab = screen.getByRole("tab", { name: "Overview" });
      const inactiveTab = screen.getByRole("tab", { name: "Settings" });
      const visiblePanel = screen.getByRole("tabpanel");
      const hiddenPanel = screen.getByText("Settings content");

      expect(screen.getByRole("tablist", { name: "Account sections" })).toBeInTheDocument();
      expect(selectedTab).toHaveAttribute("aria-selected", "true");
      expect(selectedTab).toHaveAttribute("tabindex", "0");
      expect(inactiveTab).toHaveAttribute("aria-selected", "false");
      expect(inactiveTab).toHaveAttribute("tabindex", "-1");
      expect(selectedTab).toHaveAttribute("aria-controls", visiblePanel.id);
      expect(visiblePanel).toHaveAttribute("aria-labelledby", selectedTab.id);
      expect(visiblePanel).toHaveTextContent("Overview content");
      expect(hiddenPanel).not.toBeVisible();
    });
  });

  // Selection: uncontrolled, controlled, and disabled state behavior.
  describe("selection behavior", () => {
    it("selects a tab by click and notifies uncontrolled consumers", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<UncontrolledTabs onValueChange={onValueChange} />);

      const settingsTab = screen.getByRole("tab", { name: "Settings" });
      await user.click(settingsTab);

      expect(settingsTab).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("tabpanel")).toHaveTextContent("Settings content");
      expect(onValueChange).toHaveBeenCalledOnce();
      expect(onValueChange).toHaveBeenCalledWith("settings");
    });

    it("does not select a disabled tab", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(<UncontrolledTabs onValueChange={onValueChange} />);

      await user.click(screen.getByRole("tab", { name: "Activity" }));

      expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(onValueChange).not.toHaveBeenCalled();
    });

    it("supports controlled selection without changing its own value", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();

      render(
        <Tabs.Root value="overview" onValueChange={onValueChange}>
          <Tabs.List aria-label="Controlled sections">
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview">Overview content</Tabs.Panel>
          <Tabs.Panel value="settings">Settings content</Tabs.Panel>
        </Tabs.Root>,
      );

      await user.click(screen.getByRole("tab", { name: "Settings" }));

      expect(onValueChange).toHaveBeenCalledWith("settings");
      expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByRole("tabpanel")).toHaveTextContent("Overview content");
    });
  });

  // Keyboard: focus movement, automatic activation, and event overrides.
  describe("keyboard navigation", () => {
    it("moves focus, selects automatically, wraps, and skips disabled tabs", async () => {
      const user = userEvent.setup();
      render(<UncontrolledTabs />);

      const overviewTab = screen.getByRole("tab", { name: "Overview" });
      const activityTab = screen.getByRole("tab", { name: "Activity" });
      const settingsTab = screen.getByRole("tab", { name: "Settings" });

      await user.tab();
      expect(overviewTab).toHaveFocus();

      await user.keyboard("{ArrowRight}");
      expect(settingsTab).toHaveFocus();
      expect(settingsTab).toHaveAttribute("aria-selected", "true");
      expect(activityTab).not.toHaveFocus();

      await user.keyboard("{ArrowRight}");
      expect(overviewTab).toHaveFocus();

      await user.keyboard("{End}");
      expect(settingsTab).toHaveFocus();

      await user.keyboard("{Home}");
      expect(overviewTab).toHaveFocus();

      await user.keyboard("{ArrowLeft}");
      expect(settingsTab).toHaveFocus();
    });

    it("respects a consumer preventing the list keyboard event", async () => {
      const user = userEvent.setup();

      render(
        <Tabs.Root defaultValue="overview">
          <Tabs.List aria-label="Prevented sections" onKeyDown={(event) => event.preventDefault()}>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="overview">Overview content</Tabs.Panel>
          <Tabs.Panel value="settings">Settings content</Tabs.Panel>
        </Tabs.Root>,
      );

      const overviewTab = screen.getByRole("tab", { name: "Overview" });
      overviewTab.focus();
      await user.keyboard("{ArrowRight}");

      expect(overviewTab).toHaveFocus();
      expect(overviewTab).toHaveAttribute("aria-selected", "true");
    });
  });

  // Isolation: unique relationships when multiple instances share the same values.
  describe("multiple instances", () => {
    it("generates unique tab and panel IDs for multiple instances", () => {
      render(
        <>
          <UncontrolledTabs label="Primary sections" />
          <UncontrolledTabs label="Secondary sections" />
        </>,
      );

      const overviewTabs = screen.getAllByRole("tab", { name: "Overview" });
      const visiblePanels = screen.getAllByRole("tabpanel");

      expect(overviewTabs[0].id).not.toBe(overviewTabs[1].id);
      expect(visiblePanels[0].id).not.toBe(visiblePanels[1].id);
      expect(overviewTabs[0]).toHaveAttribute("aria-controls", visiblePanels[0].id);
      expect(overviewTabs[1]).toHaveAttribute("aria-controls", visiblePanels[1].id);
    });
  });
});
