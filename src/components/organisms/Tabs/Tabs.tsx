import cn from "classnames";
import {
  createContext,
  type KeyboardEvent as ReactKeyboardEvent,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";
import { TabTrigger } from "../../molecules/Tab";
import styles from "./Tabs.module.scss";
import type {
  TabsContextValue,
  TabsListProps,
  TabsPanelProps,
  TabsRootProps,
  TabsTabProps,
} from "./types";

const TabsContext = createContext<TabsContextValue | null>(null);

export function TabsRoot(props: TabsRootProps) {
  const {
    children,
    className,
    defaultValue,
    onValueChange,
    value,
    variant = "underline",
    ...rootProps
  } = props;
  const generatedId = useId();
  const [internalValue, setInternalValue] = useState(() => defaultValue ?? value ?? "");
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;
  const baseId = `tabs-${generatedId.replace(/:/g, "")}`;

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      activeValue,
      baseId,
      variant,
      selectValue(nextValue) {
        if (nextValue === activeValue) {
          return;
        }

        if (!isControlled) {
          setInternalValue(nextValue);
        }

        onValueChange?.(nextValue);
      },
    }),
    [activeValue, baseId, isControlled, onValueChange, variant],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div {...rootProps} className={cn(styles.tabs, className)} data-variant={variant}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList(props: TabsListProps) {
  const { className, onKeyDown, ...listProps } = props;

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    );
    const currentTab = (event.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]');
    const currentIndex = currentTab ? tabs.indexOf(currentTab) : -1;

    if (currentIndex < 0) {
      return;
    }

    const nextIndex = getNextTabIndex(event.key, currentIndex, tabs.length);

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  };

  return (
    <div
      {...listProps}
      role="tablist"
      aria-orientation="horizontal"
      className={cn(styles.tabs__list, className)}
      onKeyDown={handleKeyDown}
    />
  );
}

export function TabsTab(props: TabsTabProps) {
  const { value, ...tabProps } = props;
  const { activeValue, baseId, selectValue, variant } = useTabsContext("Tabs.Tab");
  const valueId = toIdPart(value);
  const isSelected = activeValue === value;

  return (
    <TabTrigger
      {...tabProps}
      id={`${baseId}-tab-${valueId}`}
      aria-controls={`${baseId}-panel-${valueId}`}
      isSelected={isSelected}
      onSelect={() => selectValue(value)}
      tabIndex={isSelected ? 0 : -1}
      variant={variant}
    />
  );
}

export function TabsPanel(props: TabsPanelProps) {
  const { className, value, ...panelProps } = props;
  const { activeValue, baseId } = useTabsContext("Tabs.Panel");
  const valueId = toIdPart(value);

  return (
    <div
      {...panelProps}
      id={`${baseId}-panel-${valueId}`}
      role="tabpanel"
      aria-labelledby={`${baseId}-tab-${valueId}`}
      className={cn(styles.tabs__panel, className)}
      hidden={activeValue !== value}
    />
  );
}

function useTabsContext(componentName: string) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(`${componentName} must be used within Tabs.Root.`);
  }

  return context;
}

function toIdPart(value: string) {
  return encodeURIComponent(value);
}

function getNextTabIndex(key: string, currentIndex: number, tabCount: number) {
  switch (key) {
    case "ArrowRight":
      return (currentIndex + 1) % tabCount;
    case "ArrowLeft":
      return (currentIndex - 1 + tabCount) % tabCount;
    case "Home":
      return 0;
    case "End":
      return tabCount - 1;
    default:
      return null;
  }
}

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
};
