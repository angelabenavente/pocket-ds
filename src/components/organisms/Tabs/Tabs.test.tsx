import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { BadgeVariant } from "../../atoms/Badge";
import type { TabVariant } from "../../molecules/Tab";
import { Tabs } from "./Tabs";

function UncontrolledTabs(props: {
  defaultValue?: number;
  label?: string;
  onValueChange?: (value: number) => void;
}) {
  const { defaultValue = 0, label = "Account sections", onValueChange } = props;

  return (
    <Tabs aria-label={label} defaultValue={defaultValue} onValueChange={onValueChange}>
      <Tabs.Tab label="Overview">Overview content</Tabs.Tab>
      <Tabs.Tab label="Activity" disabled>
        Activity content
      </Tabs.Tab>
      <Tabs.Tab label="Settings">Settings content</Tabs.Tab>
    </Tabs>
  );
}

describe("Tabs", () => {
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
      expect(onValueChange).toHaveBeenCalledWith(2);
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
        <Tabs aria-label="Controlled sections" value={0} onValueChange={onValueChange}>
          <Tabs.Tab label="Overview">Overview content</Tabs.Tab>
          <Tabs.Tab label="Settings">Settings content</Tabs.Tab>
        </Tabs>,
      );

      await user.click(screen.getByRole("tab", { name: "Settings" }));

      expect(onValueChange).toHaveBeenCalledWith(1);
      expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByRole("tabpanel")).toHaveTextContent("Overview content");
    });
  });

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
  });

  describe("visual variants", () => {
    it.each<TabVariant>(["underline", "pill"])("supports the %s variant", (variant) => {
      render(
        <Tabs aria-label="Variant sections" variant={variant} data-testid="tabs-root">
          <Tabs.Tab label="Overview">Overview content</Tabs.Tab>
        </Tabs>,
      );

      expect(screen.getByTestId("tabs-root")).toHaveAttribute("data-variant", variant);
      expect(screen.getByRole("tab")).toHaveAttribute("data-variant", variant);
    });
  });

  describe("badge integration", () => {
    it.each<BadgeVariant>(["neutral", "positive", "negative"])(
      "renders a %s badge through the tab API",
      (variant) => {
        render(
          <Tabs aria-label="Sections with status">
            <Tabs.Tab
              label="Overview"
              badge={{
                label: "3",
                variant,
                "aria-label": `${variant} notifications`,
              }}
            >
              Overview content
            </Tabs.Tab>
          </Tabs>,
        );

        const tab = screen.getByRole("tab");
        const badge = within(tab).getByLabelText(`${variant} notifications`);

        expect(badge).toHaveTextContent("3");
        expect(badge).toHaveAttribute("data-variant", variant);
      },
    );
  });

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
