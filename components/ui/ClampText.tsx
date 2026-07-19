"use client";

import { useOverflowDetection } from "@/hooks/useOverflowDetection";
import { cn } from "@/lib/format";

const LINE_CLAMP_CLASS: Record<number, string> = {
  1: "truncate",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
};

interface ClampTextProps {
  text: string;
  lines?: 1 | 2 | 3 | 4;
  className?: string;
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3";
}

/**
 * Truncates text with CSS (no layout thrash from measuring text in JS) and
 * only attaches a native title tooltip when the text is actually cut off,
 * so short strings never show a redundant tooltip.
 */
export function ClampText({ text, lines = 1, className, as: Tag = "p" }: ClampTextProps) {
  const { ref, isOverflowing } = useOverflowDetection<HTMLElement>([text, lines]);

  return (
    <Tag
      ref={ref as never}
      className={cn(LINE_CLAMP_CLASS[lines], "break-words", className)}
      title={isOverflowing ? text : undefined}
    >
      {text}
    </Tag>
  );
}
