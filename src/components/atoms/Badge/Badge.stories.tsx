import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import styles from "./Badge.stories.module.scss";
import type { BadgeVariant } from "./types";

const variants: BadgeVariant[] = ["neutral", "positive", "negative"];

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    variant: "neutral",
  },
  argTypes: {
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

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className={styles.badgeStory}>
      {variants.map((variant) => (
        <Badge {...args} key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    controls: {
      disable: true,
    },
  },
};
