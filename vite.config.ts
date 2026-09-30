/// <reference types="vitest/config" />

import path from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react-swc";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vite";

const dirname = import.meta.dirname;

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      reporter: ["text", "html", "json-summary"],
      include: ["src/components/**/*.{ts,tsx}"],
      exclude: ["**/*.stories.*", "**/*.test.*", "**/*.module.scss", "**/index.ts", "**/types.ts"],
      all: true,
      watermarks: {
        statements: [50, 80],
        branches: [50, 80],
        functions: [50, 80],
        lines: [50, 80],
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.test.{js,ts,tsx}"],
          globals: true,
          environment: "jsdom",
          setupFiles: "./src/setupTests.ts",
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
            storybookScript: "pnpm storybook --no-open",
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
