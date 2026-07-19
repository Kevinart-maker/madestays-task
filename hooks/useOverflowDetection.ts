"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Detects whether an element's content is being clipped (by line-clamp,
 * truncate, or any overflow:hidden), so callers can decide whether a
 * "show more" affordance or tooltip is actually needed. Re-checks via
 * ResizeObserver since the same content can overflow at one width and not
 * another.
 */
export function useOverflowDetection<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkOverflow = () => {
      setIsOverflowing(el.scrollHeight - el.clientHeight > 1 || el.scrollWidth - el.clientWidth > 1);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ref, isOverflowing };
}
