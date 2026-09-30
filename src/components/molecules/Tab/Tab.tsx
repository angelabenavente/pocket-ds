import cn from "classnames";
import { forwardRef, type MouseEventHandler, useRef } from "react";
import { Badge } from "../../atoms/Badge";
import { FocusRing } from "../../atoms/FocusRing";
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

  const buttonRef = useRef<HTMLButtonElement>(null);

  void key;

  const setButtonRef = (node: HTMLButtonElement | null) => {
    buttonRef.current = node;

    if (typeof ref === "function") {
      ref(node);
      return;
    }

    if (ref) {
      ref.current = node;
    }
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);

    if (!event.defaultPrevented) {
      onSelect();
    }
  };

  return (
    <>
      <button
        {...buttonProps}
        ref={setButtonRef}
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
        {variant === "underline" ? <span aria-hidden="true" className={styles.tab__bar} /> : null}
      </button>
      <FocusRing
        borderRadius={variant === "underline" ? "var(--space-4xs)" : undefined}
        targetRef={buttonRef}
      />
    </>
  );
});

TabTrigger.displayName = "Tab";

function TabBadgeContent(props: TabBadge) {
  return <Badge {...props} />;
}
