import type { ReactNode } from "react";
import styles from "./FoundationsPage.module.scss";

type FoundationsPageProps = {
  children: ReactNode;
};

export function FoundationsPage({ children }: FoundationsPageProps) {
  return <div className={styles.foundationsPage}>{children}</div>;
}
