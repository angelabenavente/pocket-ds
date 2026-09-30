import styles from "./FoundationsPage.module.scss";
import type { FoundationsPageProps } from "./types";

export function FoundationsPage(props: FoundationsPageProps) {
  const { children } = props;

  return <div className={styles.foundationsPage}>{children}</div>;
}
