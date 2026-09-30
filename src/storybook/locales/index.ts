import { useEffect, useState } from "react";
import { addons } from "storybook/preview-api";
import enComponents from "./en-GB/components.json";
import enFoundations from "./en-GB/foundations.json";
import enGuide from "./en-GB/guide.json";
import esComponents from "./es-ES/components.json";
import esFoundations from "./es-ES/foundations.json";
import esGuide from "./es-ES/guide.json";
import itComponents from "./it-IT/components.json";
import itFoundations from "./it-IT/foundations.json";
import itGuide from "./it-IT/guide.json";

export const locales = [
  { value: "en-GB", title: "Locale: en-GB", right: "🇬🇧" },
  { value: "es-ES", title: "Locale: es-ES", right: "🇪🇸" },
  { value: "it-IT", title: "Locale: it-IT", right: "🇮🇹" },
] as const;

export type Locale = (typeof locales)[number]["value"];

export const defaultLocale: Locale = "en-GB";

type MessageTree<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? MessageTree<Item>[]
    : { [Key in keyof T]: MessageTree<T[Key]> };

export type StoryCopy = {
  components: MessageTree<typeof enComponents>;
  foundations: MessageTree<typeof enFoundations>;
  guide: MessageTree<typeof enGuide>;
};

const storyCopy: Record<Locale, StoryCopy> = {
  "en-GB": {
    components: enComponents,
    foundations: enFoundations,
    guide: enGuide,
  },
  "es-ES": {
    components: esComponents,
    foundations: esFoundations,
    guide: esGuide,
  },
  "it-IT": {
    components: itComponents,
    foundations: itFoundations,
    guide: itGuide,
  },
};

const globalsUpdatedEvent = "globalsUpdated";

export function resolveLocale(value: unknown): Locale {
  return locales.some((locale) => locale.value === value) ? (value as Locale) : defaultLocale;
}

function readLocaleFromLocation(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const globals = new URLSearchParams(window.location.search).get("globals") ?? "";
  const locale = globals
    .split(";")
    .find((entry) => entry.startsWith("locale:"))
    ?.slice("locale:".length);

  return resolveLocale(locale ? decodeURIComponent(locale) : undefined);
}

export function useStoryCopy(): StoryCopy {
  const [locale, setLocale] = useState(readLocaleFromLocation);

  useEffect(() => {
    const channel = addons.getChannel();
    const handleGlobalsUpdated = (payload: { globals?: { locale?: unknown } }) => {
      setLocale(resolveLocale(payload.globals?.locale));
    };

    channel.on(globalsUpdatedEvent, handleGlobalsUpdated);

    return () => {
      channel.off(globalsUpdatedEvent, handleGlobalsUpdated);
    };
  }, []);

  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }

  return storyCopy[locale];
}
