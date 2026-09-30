import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";
import { type TextElement, textVariants } from "./types";

const elements: TextElement[] = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"];
const example = "The quick brown fox jumps over the lazy dog.";

const meta = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    children: example,
    variant: "body-m",
  },
  argTypes: {
    as: {
      control: "select",
      options: elements,
      table: {
        defaultValue: { summary: "p" },
        type: { summary: "h1 | h2 | h3 | h4 | h5 | h6 | p | span" },
      },
    },
    children: {
      control: "text",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    variant: {
      control: "select",
      options: [...textVariants],
      table: {
        defaultValue: { summary: "body-m" },
        type: { summary: textVariants.join(" | ") },
      },
    },
  },
  parameters: {
    controls: {
      include: ["as", "children", "variant"],
    },
    docs: {
      description: {
        component:
          "Applies one of the six foundation typography styles. heading-m and heading-s were invented for Storybook documentation and are not part of the official specification. button-m and button-s set the type style only; they do not render a button.",
      },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HeadingM: Story = {
  args: {
    variant: "heading-m",
  },
};

export const HeadingS: Story = {
  args: {
    variant: "heading-s",
  },
};

export const BodyM: Story = {
  args: {
    variant: "body-m",
  },
};

export const BodyS: Story = {
  args: {
    variant: "body-s",
  },
};

export const ButtonM: Story = {
  args: {
    variant: "button-m",
  },
};

export const ButtonS: Story = {
  args: {
    variant: "button-s",
  },
};
