import type { Preview } from "@storybook/react-vite";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-700.css";
import "../src/foundations/styles/foundations.docs.scss";
import "../src/styles/globals.scss";

const preview: Preview = {
  parameters: {
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
    viewport: { value: "responsive", isRotated: false },
  },
};

export default preview;
