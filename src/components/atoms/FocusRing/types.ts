import type { RefObject } from "react";

export type FocusRingProps = {
  borderRadius?: string;
  className?: string;
  key?: string;
  targetRef: RefObject<HTMLElement | null>;
};
