import cn from "classnames";
import { Text } from "../Text";
import styles from "./Badge.module.scss";
import type { BadgeProps } from "./types";

export function Badge(props: BadgeProps) {
  const { className, key, label, variant = "neutral", ...badgeProps } = props;

  void key;

  return (
    <Text
      {...badgeProps}
      as="span"
      className={cn(styles.badge, className)}
      data-variant={variant}
      variant="body-s"
    >
      {label}
    </Text>
  );
}
