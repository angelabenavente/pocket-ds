import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TabVariant } from "../../molecules/Tab";
import { Tabs } from "./Tabs";
import styles from "./Tabs.stories.module.scss";

interface TabsDemoProps {
  defaultValue: string;
  label: string;
  variant: TabVariant;
  withBadges?: boolean;
}

function TabsDemo(props: TabsDemoProps) {
  const { defaultValue, label, variant, withBadges = false } = props;

  return (
    <Tabs.Root defaultValue={defaultValue} variant={variant}>
      <Tabs.List aria-label={label}>
        <Tabs.Tab
          value="overview"
          badge={
            withBadges
              ? {
                  content: "3",
                  variant: "neutral",
                  "aria-label": "3 overview notifications",
                }
              : undefined
          }
        >
          Overview
        </Tabs.Tab>
        <Tabs.Tab
          value="activity"
          badge={
            withBadges
              ? {
                  content: "12",
                  variant: "positive",
                  "aria-label": "12 positive activity updates",
                }
              : undefined
          }
        >
          Activity
        </Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Tab value="disabled" disabled>
          Disabled
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">{label}: overview content</Tabs.Panel>
      <Tabs.Panel value="activity">{label}: activity content</Tabs.Panel>
      <Tabs.Panel value="settings">{label}: settings content</Tabs.Panel>
      <Tabs.Panel value="disabled">{label}: disabled content</Tabs.Panel>
    </Tabs.Root>
  );
}

const variants: TabVariant[] = ["underline", "pill"];

const meta = {
  title: "Components/Tabs",
  component: Tabs.Root,
  tags: ["autodocs"],
  args: {
    defaultValue: "overview",
    variant: "underline",
  },
  argTypes: {
    children: {
      control: false,
    },
    variant: {
      control: "inline-radio",
      options: variants,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "An accessible compound component for switching between related panels. Compose it with Tabs.Root, Tabs.List, Tabs.Tab, and Tabs.Panel.",
      },
    },
  },
} satisfies Meta<typeof Tabs.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Underline: Story = {
  render: (args) => (
    <div className={styles.tabsStory}>
      <TabsDemo
        defaultValue={args.defaultValue ?? "overview"}
        label="Account sections"
        variant={args.variant ?? "underline"}
      />
    </div>
  ),
};

export const Pill: Story = {
  ...Underline,
  args: {
    defaultValue: "overview",
    variant: "pill",
  },
};

export const WithBadges: Story = {
  render: (args) => (
    <div className={styles.tabsStory}>
      <TabsDemo
        defaultValue={args.defaultValue ?? "overview"}
        label="Inbox sections"
        variant={args.variant ?? "underline"}
        withBadges
      />
    </div>
  ),
};

export const MultipleInstances: Story = {
  render: () => (
    <div className={styles.tabsStory__instances}>
      <TabsDemo defaultValue="overview" label="Primary sections" variant="underline" />
      <TabsDemo defaultValue="activity" label="Secondary sections" variant="pill" />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
