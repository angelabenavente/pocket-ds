import cn from "classnames";
import {
  Children,
  createContext,
  isValidElement,
  type ReactElement,
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
  TabsProps,
  TabsTabProps,
} from "./types";

const TabsContext = createContext<TabsContextValue | null>(null);

function TabsRoot(props: Omit<TabsProps, "aria-label" | "aria-labelledby">) {
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
  const [internalValue, setInternalValue] = useState(() => defaultValue ?? value ?? 0);
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

function TabsList(props: TabsListProps) {
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

function TabsTrigger(props: Omit<TabsTabProps, "children"> & { index: number }) {
  const { index, ...tabProps } = props;
  const { activeValue, baseId, selectValue, variant } = useTabsContext("Tabs.Tab");
  const valueId = toIdPart(index);
  const isSelected = activeValue === index;

  return (
    <TabTrigger
      {...tabProps}
      id={`${baseId}-tab-${valueId}`}
      aria-controls={`${baseId}-panel-${valueId}`}
      isSelected={isSelected}
      onSelect={() => selectValue(index)}
      tabIndex={isSelected ? 0 : -1}
      variant={variant}
    />
  );
}

function TabsPanel(props: TabsPanelProps) {
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

function TabsTab(_props: TabsTabProps) {
  return null;
}

TabsTab.displayName = "Tabs.Tab";

function useTabsContext(componentName: string) {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(`${componentName} must be used within Tabs.`);
  }

  return context;
}

function toIdPart(index: number) {
  return String(index);
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

function tabElementKey(label: string, index: number) {
  return `${label}-${index}`;
}

function isTabElement(child: unknown): child is ReactElement<TabsTabProps> {
  return isValidElement(child) && child.type === TabsTab;
}

function TabsComponent(props: TabsProps) {
  const { "aria-label": ariaLabel, children, key, ...rootProps } = props;

  void key;
  const items = Children.toArray(children).filter(isTabElement);

  return (
    <TabsRoot {...rootProps}>
      <TabsList aria-label={ariaLabel}>
        {items.map((item, index) => {
          const { children: _panel, ...tabProps } = item.props;

          return (
            <TabsTrigger key={tabElementKey(item.props.label, index)} index={index} {...tabProps} />
          );
        })}
      </TabsList>
      {items.map((item, index) => (
        <TabsPanel key={tabElementKey(item.props.label, index)} value={index}>
          {item.props.children}
        </TabsPanel>
      ))}
    </TabsRoot>
  );
}

TabsComponent.displayName = "Tabs";

export const Tabs = Object.assign(TabsComponent, {
  Tab: TabsTab,
});
