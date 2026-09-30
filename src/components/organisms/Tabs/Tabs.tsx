import { createContext, useContext, useId, useMemo, useState } from "react";
import { TabTrigger } from "../../molecules/Tab";
import type {
  TabsContextValue,
  TabsListProps,
  TabsPanelProps,
  TabsRootProps,
  TabsTabProps,
} from "./types";

const TabsContext = createContext<TabsContextValue | null>(null);

export function TabsRoot(props: TabsRootProps) {
  const { children, defaultValue, onValueChange, value, ...rootProps } = props;
  const generatedId = useId();
  const [internalValue, setInternalValue] = useState(() => defaultValue ?? value ?? "");
  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;
  const baseId = `tabs-${generatedId.replace(/:/g, "")}`;

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      activeValue,
      baseId,
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
    [activeValue, baseId, isControlled, onValueChange],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div {...rootProps}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList(props: TabsListProps) {
  return <div {...props} role="tablist" aria-orientation="horizontal" />;
}

export function TabsTab(props: TabsTabProps) {
  const { value, ...tabProps } = props;
  const { activeValue, baseId, selectValue } = useTabsContext("Tabs.Tab");
  const valueId = toIdPart(value);

  return (
    <TabTrigger
      {...tabProps}
      id={`${baseId}-tab-${valueId}`}
      aria-controls={`${baseId}-panel-${valueId}`}
      isSelected={activeValue === value}
      onSelect={() => selectValue(value)}
    />
  );
}

export function TabsPanel(props: TabsPanelProps) {
  const { value, ...panelProps } = props;
  const { activeValue, baseId } = useTabsContext("Tabs.Panel");
  const valueId = toIdPart(value);

  return (
    <div
      {...panelProps}
      id={`${baseId}-panel-${valueId}`}
      role="tabpanel"
      aria-labelledby={`${baseId}-tab-${valueId}`}
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

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
};
