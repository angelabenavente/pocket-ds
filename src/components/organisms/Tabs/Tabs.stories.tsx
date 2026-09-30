import type { Decorator, Meta } from "@storybook/react-vite";
import { Tabs } from "./Tabs";
import styles from "./Tabs.stories.module.scss";

const withStoryWidth: Decorator[] = [
  (Story) => (
    <div className={styles.tabsStory}>
      <Story />
    </div>
  ),
];

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        component:
          "An accessible set of tabs. Tabs.Tab uses the same props as Tab. Its label is the tab name, and its children are the panel content.",
      },
    },
  },
  decorators: withStoryWidth,
} satisfies Meta<typeof Tabs>;

export default meta;

export const Underline = {
  render: () => (
    <Tabs aria-label="Account sections" variant="underline">
      <Tabs.Tab label="Overview">Overview content</Tabs.Tab>
      <Tabs.Tab label="Activity">Activity content</Tabs.Tab>
      <Tabs.Tab label="Settings">Settings content</Tabs.Tab>
      <Tabs.Tab label="Disabled" disabled>
        Disabled content
      </Tabs.Tab>
    </Tabs>
  ),
};

export const Pill = {
  render: () => (
    <Tabs aria-label="Account sections" variant="pill">
      <Tabs.Tab label="Overview">Overview content</Tabs.Tab>
      <Tabs.Tab label="Activity">Activity content</Tabs.Tab>
      <Tabs.Tab label="Settings">Settings content</Tabs.Tab>
      <Tabs.Tab label="Disabled" disabled>
        Disabled content
      </Tabs.Tab>
    </Tabs>
  ),
};

export const WithBadges = {
  render: () => (
    <Tabs aria-label="Inbox sections" variant="underline">
      <Tabs.Tab
        label="Overview"
        badge={{
          label: "3",
          variant: "neutral",
          "aria-label": "3 overview notifications",
        }}
      >
        Overview content
      </Tabs.Tab>
      <Tabs.Tab
        label="Activity"
        badge={{
          label: "12",
          variant: "positive",
          "aria-label": "12 positive activity updates",
        }}
      >
        Activity content
      </Tabs.Tab>
      <Tabs.Tab label="Settings">Settings content</Tabs.Tab>
      <Tabs.Tab label="Disabled" disabled>
        Disabled content
      </Tabs.Tab>
    </Tabs>
  ),
};
