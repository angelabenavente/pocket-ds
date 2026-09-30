import type { Preview } from "@storybook/react-vite";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-700.css";
import "../src/foundations/styles/foundations.docs.scss";
import "../src/styles/globals.scss";
import { defaultLocale, locales, resolveLocale } from "../src/storybook/locales";

const preview: Preview = {
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Story locale",
      toolbar: {
        icon: "globe",
        items: [...locales],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.lang = resolveLocale(context.globals.locale);

      return Story();
    },
  ],
  parameters: {
    a11y: {
      test: "error",
    },
    docs: {
      toc: true,
    },
    layout: "padded",
    options: {
      storySort: {
        order: ["Foundations", "Introduction", "Components", "*"],
      },
    },
    viewport: {
      viewports: {
        mobileTrue: {
          name: "Mobile True (768px)",
          styles: { width: "768px", height: "100%" },
          type: "mobile",
        },
        mobileSmall: {
          name: "Mobile (375px)",
          styles: { width: "375px", height: "100%" },
          type: "mobile",
        },
      },
    },
  },
  initialGlobals: {
    locale: defaultLocale,
    viewport: { value: "responsive", isRotated: false },
  },
};

export default preview;
