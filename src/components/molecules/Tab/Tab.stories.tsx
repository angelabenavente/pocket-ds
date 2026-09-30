import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { TabTrigger } from "./Tab";
import styles from "./Tab.stories.module.scss";
import type { TabVariant } from "./types";

const variants: TabVariant[] = ["underline", "pill"];

const withTabList: Decorator = (Story) => (
  <div role="tablist" aria-label="Tab preview">
    <Story />
  </div>
);

const meta = {
  title: "Components/Tabs/Tab",
  component: TabTrigger,
  tags: ["autodocs"],
  args: {
    label: "Overview",
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
          "The visual tab trigger. Use Tabs when you need selection, keyboard navigation, and panels. Tab on its own only renders the trigger.",
      },
    },
  },
  decorators: [withTabList],
} satisfies Meta<typeof TabTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Underline: Story = {};

export const Pill: Story = {
  args: {
    variant: "pill",
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};

export const Hover: Story = {
  decorators: [
    (Story) => (
      <div className={styles.tabStory__forcedHover}>
        <Story />
      </div>
    ),
  ],
};

export const WithBadge: Story = {
  args: {
    badge: {
      label: "3",
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
