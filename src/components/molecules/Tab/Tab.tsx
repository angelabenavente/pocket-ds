import cn from "classnames";
import { forwardRef, type MouseEventHandler } from "react";
import { Badge } from "../../atoms/Badge";
import { Text } from "../../atoms/Text";
import styles from "./Tab.module.scss";
import type { TabBadge, TabTriggerProps } from "./types";

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(function Tab(props, ref) {
  const {
    badge,
    className,
    disabled,
    isSelected,
    key,
    label,
    onClick,
    onSelect,
    variant = "underline",
    ...buttonProps
  } = props;

  void key;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);

    if (!event.defaultPrevented) {
      onSelect();
    }
  };

  return (
    <button
      {...buttonProps}
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={cn(styles.tab, className)}
      data-variant={variant}
      data-state={isSelected ? "active" : "inactive"}
      disabled={disabled}
      onClick={handleClick}
    >
      <Text as="span" className={styles.tab__label} variant="button-s">
        {label}
      </Text>
      {badge ? <TabBadgeContent {...badge} /> : null}
    </button>
  );
});

TabTrigger.displayName = "Tab";

function TabBadgeContent(props: TabBadge) {
  return <Badge {...props} />;
}
