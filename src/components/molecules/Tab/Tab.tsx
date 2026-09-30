import { forwardRef, type MouseEventHandler } from "react";
import type { TabTriggerProps } from "./types";

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(
  function TabTrigger(props, ref) {
    const { children, disabled, isSelected, onClick, onSelect, ...buttonProps } = props;

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
        data-state={isSelected ? "active" : "inactive"}
        disabled={disabled}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  },
);
