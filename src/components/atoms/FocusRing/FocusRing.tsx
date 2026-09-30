import cn from "classnames";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./FocusRing.module.scss";
import type { FocusRingProps } from "./types";

type RingBox = {
  height: number;
  left: number;
  top: number;
  width: number;
};

const fallbackGap = 2;

function readGap(element: HTMLElement) {
  const parsed = Number.parseFloat(getComputedStyle(element).getPropertyValue("--space-4xs"));

  return Number.isFinite(parsed) ? parsed : fallbackGap;
}

function focusRingBox(rect: DOMRect, gap: number, stroke: number): RingBox {
  const outset = gap + stroke;

  return {
    left: rect.left - outset,
    top: rect.top - outset,
    width: rect.width + outset * 2,
    height: rect.height + outset * 2,
  };
}

export function FocusRing(props: FocusRingProps) {
  const { borderRadius, className, key, targetRef } = props;
  const [box, setBox] = useState<RingBox | null>(null);

  void key;

  useEffect(() => {
    const element = targetRef.current;

    if (!element) {
      return;
    }

    const place = () => {
      if (!element.matches(":focus-visible")) {
        setBox(null);
        return;
      }

      const rect = element.getBoundingClientRect();

      if (rect.width === 0 && rect.height === 0) {
        setBox(null);
        return;
      }

      const gap = readGap(element);

      setBox(focusRingBox(rect, gap, gap));
    };

    element.addEventListener("focus", place);
    element.addEventListener("blur", place);
    document.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(place);
    observer?.observe(element);

    return () => {
      element.removeEventListener("focus", place);
      element.removeEventListener("blur", place);
      document.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
      observer?.disconnect();
    };
  }, [targetRef]);

  if (!box) {
    return null;
  }

  return createPortal(
    <div
      aria-hidden="true"
      className={cn(styles.focusRing, className)}
      style={{
        borderRadius,
        height: box.height,
        left: box.left,
        top: box.top,
        width: box.width,
      }}
    />,
    document.body,
  );
}
