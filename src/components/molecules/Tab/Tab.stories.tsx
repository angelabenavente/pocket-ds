import {
  Controls,
  Description,
  DocsContext,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks";
import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { useContext } from "react";
import { useStoryCopy } from "../../../storybook/locales";
import { TabTrigger } from "./Tab";
import styles from "./Tab.stories.module.scss";
import type { TabVariant } from "./types";

const variants: TabVariant[] = ["underline", "pill"];

const withTabList: Decorator = (Story) => (
  <div role="tablist" aria-label="Tab preview">
    <Story />
  </div>
);

function TabDocsPage() {
  const copy = useStoryCopy();
  const context = useContext(DocsContext);
  const stories = context.componentStories();

  for (const story of stories) {
    const keyArgType = story.argTypes.key;

    if (keyArgType) {
      keyArgType.table = {
        ...keyArgType.table,
        defaultValue: { summary: copy.components.tabKeyDefault },
      };
    }
  }

  const isSingleStory = stories.length === 1;

  return (
    <>
      <Title />
      <Subtitle />
      <Description of="meta" />
      {isSingleStory ? <Description of="story" /> : null}
      <Primary />
      <Controls />
      {isSingleStory ? null : <Stories />}
    </>
  );
}

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
    key: {
      table: {
        defaultValue: { summary: "Filled with the index" },
      },
    },
    onSelect: {
      control: false,
    },
    variant: {
      control: "select",
      options: variants,
      table: {
        defaultValue: { summary: "underline" },
        type: { summary: "underline | pill" },
      },
    },
  },
  parameters: {
    docs: {
      page: TabDocsPage,
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
