import type { Meta, StoryObj } from "@storybook/react-vite";
import { type StoryCopy, useStoryCopy } from "../../../storybook/locales";
import type { TabVariant } from "../../molecules/Tab";
import { Tabs } from "./Tabs";
import styles from "./Tabs.stories.module.scss";

interface TabsDemoProps {
  defaultValue: string;
  label: keyof Pick<
    StoryCopy["components"],
    "accountSections" | "inboxSections" | "primarySections" | "secondarySections"
  >;
  variant: TabVariant;
  withBadges?: boolean;
}

function TabsDemo(props: TabsDemoProps) {
  const { defaultValue, label, variant, withBadges = false } = props;
  const copy = useStoryCopy().components;
  const sectionLabel = copy[label];

  return (
    <Tabs.Root defaultValue={defaultValue} variant={variant}>
      <Tabs.List aria-label={sectionLabel}>
        <Tabs.Tab
          value="overview"
          badge={
            withBadges
              ? {
                  content: "3",
                  variant: "neutral",
                  "aria-label": copy.overviewNotifications,
                }
              : undefined
          }
        >
          {copy.overview}
        </Tabs.Tab>
        <Tabs.Tab
          value="activity"
          badge={
            withBadges
              ? {
                  content: "12",
                  variant: "positive",
                  "aria-label": copy.activityUpdates,
                }
              : undefined
          }
        >
          {copy.activity}
        </Tabs.Tab>
        <Tabs.Tab value="settings">{copy.settings}</Tabs.Tab>
        <Tabs.Tab value="disabled" disabled>
          {copy.disabled}
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        {sectionLabel}: {copy.overviewContent}
      </Tabs.Panel>
      <Tabs.Panel value="activity">
        {sectionLabel}: {copy.activityContent}
      </Tabs.Panel>
      <Tabs.Panel value="settings">
        {sectionLabel}: {copy.settingsContent}
      </Tabs.Panel>
      <Tabs.Panel value="disabled">
        {sectionLabel}: {copy.disabledContent}
      </Tabs.Panel>
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
        label="accountSections"
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
        label="inboxSections"
        variant={args.variant ?? "underline"}
        withBadges
      />
    </div>
  ),
};

export const MultipleInstances: Story = {
  render: () => (
    <div className={styles.tabsStory__instances}>
      <TabsDemo defaultValue="overview" label="primarySections" variant="underline" />
      <TabsDemo defaultValue="activity" label="secondarySections" variant="pill" />
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
