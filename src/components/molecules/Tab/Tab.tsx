import cn from "classnames";
import { forwardRef, type MouseEventHandler } from "react";
import styles from "./Tab.module.scss";
import type { TabTriggerProps } from "./types";

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(
  function TabTrigger(props, ref) {
    const {
      children,
      className,
      disabled,
      isSelected,
      onClick,
      onSelect,
      variant = "underline",
      ...buttonProps
    } = props;

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
        {children}
      </button>
    );
  },
);
