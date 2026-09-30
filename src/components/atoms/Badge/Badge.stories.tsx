import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import type { BadgeVariant } from "./types";

const variants: BadgeVariant[] = ["neutral", "positive", "negative"];

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    label: "Badge",
    variant: "neutral",
  },
  argTypes: {
    label: {
      control: false,
    },
    variant: {
      control: "select",
      options: variants,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A compact status or count label. Badge is an independent atom and can be used inside Tabs or other components.",
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Positive: Story = {
  args: {
    variant: "positive",
  },
};

export const Negative: Story = {
  args: {
    variant: "negative",
  },
};
