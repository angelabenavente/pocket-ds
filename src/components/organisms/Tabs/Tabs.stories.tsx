import type { Decorator, Meta } from "@storybook/react-vite";
import type { TabVariant } from "../../molecules/Tab";
import { Tabs } from "./Tabs";
import styles from "./Tabs.stories.module.scss";
import { type TabsAlign, tabsAlignments } from "./types";

const variants: TabVariant[] = ["underline", "pill"];

type TabsStoryArgs = {
  align: TabsAlign;
  "aria-label": string;
  variant: TabVariant;
};

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
  args: {
    align: "left",
    "aria-label": "Account sections",
    variant: "underline",
  },
  argTypes: {
    align: {
      control: "inline-radio",
      options: [...tabsAlignments],
      table: {
        defaultValue: { summary: "left" },
        type: { summary: "left | center | right" },
      },
    },
    variant: {
      control: "select",
      options: variants,
      table: {
        defaultValue: { summary: "underline" },
        type: { summary: "underline | pill" },
      },
    },
  },
  parameters: {
    controls: {
      include: ["align", "variant"],
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

function renderAccountTabs(args: TabsStoryArgs) {
  const { align, variant } = args;
  const label = args["aria-label"];

  return (
    <Tabs align={align} aria-label={label} variant={variant}>
      <Tabs.Tab label="Overview">Overview content</Tabs.Tab>
      <Tabs.Tab label="Activity">Activity content</Tabs.Tab>
      <Tabs.Tab label="Settings">Settings content</Tabs.Tab>
      <Tabs.Tab label="Disabled" disabled>
        Disabled content
      </Tabs.Tab>
    </Tabs>
  );
}

export const Underline = {
  render: renderAccountTabs,
};

export const Pill = {
  args: {
    variant: "pill",
  },
  render: renderAccountTabs,
};

export const Center = {
  args: {
    align: "center",
  },
  render: renderAccountTabs,
};

export const Right = {
  args: {
    align: "right",
  },
  render: renderAccountTabs,
};

export const WithBadges = {
  args: {
    "aria-label": "Inbox sections",
  },
  render: (args: TabsStoryArgs) => (
    <Tabs align={args.align} aria-label={args["aria-label"]} variant={args.variant}>
      <Tabs.Tab
        label="Overview"
        badge={{
          label: "3",
          variant: "negative",
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
