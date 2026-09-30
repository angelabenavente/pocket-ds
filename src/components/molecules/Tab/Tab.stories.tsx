import type { Meta, StoryObj } from "@storybook/react-vite";
import cn from "classnames";
import { TabTrigger } from "./Tab";
import styles from "./Tab.stories.module.scss";
import type { TabVariant } from "./types";

const variants: TabVariant[] = ["underline", "pill"];

const meta = {
  title: "Components/Tabs/Tab",
  component: TabTrigger,
  tags: ["autodocs"],
  args: {
    children: "Overview",
    isSelected: false,
    onSelect: () => undefined,
    variant: "underline",
  },
  argTypes: {
    badge: {
      control: false,
    },
    isSelected: {
      control: "boolean",
    },
    onSelect: {
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
          "The visual trigger used by Tabs.Tab. Use Tabs.Tab inside a Tabs composition so selection, keyboard navigation, and ARIA relationships are managed automatically.",
      },
    },
  },
  render: (args) => (
    <div role="tablist" aria-label="Tab preview">
      <TabTrigger {...args} />
    </div>
  ),
} satisfies Meta<typeof TabTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};

export const Hover: Story = {
  render: (args) => (
    <div role="tablist" aria-label="Hovered tab preview">
      <TabTrigger {...args} className={cn(args.className, styles.tabStory__forcedHover)} />
    </div>
  ),
};

export const WithBadge: Story = {
  args: {
    badge: {
      content: "3",
      variant: "neutral",
      "aria-label": "3 notifications",
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className={styles.tabStory}>
      {variants.map((variant) => (
        <div
          key={variant}
          className={styles.tabStory__row}
          role="tablist"
          aria-label={`${variant} tab states`}
        >
          <div className={styles.tabStory__state}>
            <span className={styles.tabStory__label}>Default</span>
            <TabTrigger isSelected={false} onSelect={() => undefined} variant={variant}>
              Overview
            </TabTrigger>
          </div>

          <div className={styles.tabStory__state}>
            <span className={styles.tabStory__label}>Hover</span>
            <TabTrigger
              className={styles.tabStory__forcedHover}
              isSelected={false}
              onSelect={() => undefined}
              variant={variant}
            >
              Overview
            </TabTrigger>
          </div>

          <div className={styles.tabStory__state}>
            <span className={styles.tabStory__label}>Selected</span>
            <TabTrigger isSelected onSelect={() => undefined} variant={variant}>
              Overview
            </TabTrigger>
          </div>

          <div className={styles.tabStory__state}>
            <span className={styles.tabStory__label}>Disabled</span>
            <TabTrigger disabled isSelected={false} onSelect={() => undefined} variant={variant}>
              Overview
            </TabTrigger>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
