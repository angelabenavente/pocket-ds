import cn from "classnames";
import { Text } from "../Text";
import styles from "./Badge.module.scss";
import type { BadgeProps } from "./types";

export function Badge(props: BadgeProps) {
  const { children, className, variant = "neutral", ...badgeProps } = props;

  return (
    <Text
      {...badgeProps}
      as="span"
      className={cn(styles.badge, className)}
      data-variant={variant}
      variant="body-s"
    >
      {children}
    </Text>
  );
}
