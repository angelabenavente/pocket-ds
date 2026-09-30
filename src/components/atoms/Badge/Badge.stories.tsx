import type { Meta, StoryObj } from "@storybook/react-vite";
import { useStoryCopy } from "../../../storybook/locales";
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
    children: {
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
  render: (args) => {
    const copy = useStoryCopy().components;

    return <Badge {...args}>{copy.badge}</Badge>;
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => {
    const copy = useStoryCopy().components;

    return (
      <div className={styles.badgeStory}>
        {variants.map((variant) => (
          <Badge {...args} key={variant} variant={variant}>
            {copy[variant]}
          </Badge>
        ))}
      </div>
    );
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
};
