import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const PAGE_TITLE = "Pocket DS";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: PAGE_TITLE,
    brandUrl: "./",
    brandImage: "/logo.svg",
    brandTarget: "_self",
  }),
});

addons.register("pocket-ds-title", (api) => {
  const setTitle = () => {
    let storyData: { title?: string; name?: string } | null = null;

    try {
      storyData = api.getCurrentStoryData();
    } catch {
      // Storybook may throw before a story is ready.
    }

    document.title =
      storyData?.title && storyData.name
        ? `${storyData.title.replace(/\//g, " / ")} - ${storyData.name} ⋅ ${PAGE_TITLE}`
        : PAGE_TITLE;
  };

  const titleElement = document.querySelector("title");

  if (titleElement) {
    new MutationObserver(() => {
      if (document.title.endsWith("Storybook")) {
        setTitle();
      }
    }).observe(titleElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  setTitle();
});
