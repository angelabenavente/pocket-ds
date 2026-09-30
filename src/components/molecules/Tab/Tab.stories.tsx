import type { Meta, StoryObj } from "@storybook/react-vite";
import cn from "classnames";
import { useStoryCopy } from "../../../storybook/locales";
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
  render: (args) => {
    const copy = useStoryCopy().components;

    return (
      <div role="tablist" aria-label={copy.tabPreview}>
        <TabTrigger {...args}>{copy.overview}</TabTrigger>
      </div>
    );
  },
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
  render: (args) => {
    const copy = useStoryCopy().components;

    return (
      <div role="tablist" aria-label={copy.hoveredTabPreview}>
        <TabTrigger {...args} className={cn(args.className, styles.tabStory__forcedHover)}>
          {copy.overview}
        </TabTrigger>
      </div>
    );
  },
};

export const WithBadge: Story = {
  render: (args) => {
    const copy = useStoryCopy().components;

    return (
      <div role="tablist" aria-label={copy.tabPreview}>
        <TabTrigger
          {...args}
          badge={{
            content: "3",
            variant: "neutral",
            "aria-label": copy.notifications,
          }}
        >
          {copy.overview}
        </TabTrigger>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => {
    const copy = useStoryCopy().components;

    return (
      <div className={styles.tabStory}>
        {variants.map((variant) => (
          <div
            key={variant}
            className={styles.tabStory__row}
            role="tablist"
            aria-label={`${variant} ${copy.tabStates}`}
          >
            <div className={styles.tabStory__state}>
              <span className={styles.tabStory__label}>{copy.default}</span>
              <TabTrigger isSelected={false} onSelect={() => undefined} variant={variant}>
                {copy.overview}
              </TabTrigger>
            </div>

            <div className={styles.tabStory__state}>
              <span className={styles.tabStory__label}>{copy.hover}</span>
              <TabTrigger
                className={styles.tabStory__forcedHover}
                isSelected={false}
                onSelect={() => undefined}
                variant={variant}
              >
                {copy.overview}
              </TabTrigger>
            </div>

            <div className={styles.tabStory__state}>
              <span className={styles.tabStory__label}>{copy.selected}</span>
              <TabTrigger isSelected onSelect={() => undefined} variant={variant}>
                {copy.overview}
              </TabTrigger>
            </div>

            <div className={styles.tabStory__state}>
              <span className={styles.tabStory__label}>{copy.disabled}</span>
              <TabTrigger disabled isSelected={false} onSelect={() => undefined} variant={variant}>
                {copy.overview}
              </TabTrigger>
            </div>
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
