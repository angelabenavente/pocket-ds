import cn from "classnames";
import styles from "./Badge.module.scss";
import type { BadgeProps } from "./types";

export function Badge(props: BadgeProps) {
  const { children, className, variant = "neutral", ...badgeProps } = props;

  return (
    <span {...badgeProps} className={cn(styles.badge, className)} data-variant={variant}>
      {children}
    </span>
  );
}
