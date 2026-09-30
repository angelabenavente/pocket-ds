import type { Meta, StoryObj } from "@storybook/react-vite";
import { useStoryCopy } from "../../../storybook/locales";
import { Text } from "./Text";
import styles from "./Text.stories.module.scss";
import { type TextElement, textVariants } from "./types";

const elements: TextElement[] = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"];

const meta = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    children: "Text",
    variant: "body-m",
  },
  argTypes: {
    as: {
      control: "select",
      options: elements,
    },
    children: {
      control: false,
    },
    variant: {
      control: "select",
      options: textVariants,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Applies one of the six foundation typography styles. heading-m and heading-s were invented for Storybook documentation and are not part of the official specification. button-m and button-s set the type style only; they do not render a button.",
      },
    },
  },
  render: (args) => {
    const copy = useStoryCopy().components;

    return <Text {...args}>{copy.textSample}</Text>;
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => {
    const copy = useStoryCopy().components;

    return (
      <div className={styles.textStory}>
        {textVariants.map((variant) => (
          <div key={variant} className={styles.textStory__item}>
            <Text variant="body-s">{variant}</Text>
            <Text variant={variant}>{copy.textSample}</Text>
          </div>
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
