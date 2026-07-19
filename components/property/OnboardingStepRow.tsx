"use client";

import { useState } from "react";
import { StepStatusChip } from "@/components/ui/StatusBadge";
import { useOverflowDetection } from "@/hooks/useOverflowDetection";
import { cn } from "@/lib/format";
import { getStepStatusDescription, type ResolvedStep } from "@/lib/status";
import type { StatusLegend } from "@/lib/types";

interface NoteBlockProps {
  note: string;
}

/** Clamps a note to 2 lines and only offers "show more" when it's actually cut off. */
function NoteBlock({ note }: NoteBlockProps) {
  const [expanded, setExpanded] = useState(false);
  const { ref, isOverflowing } = useOverflowDetection<HTMLParagraphElement>([note, expanded]);

  return (
    <div className="flex flex-col items-start gap-1">
      <p
        ref={ref}
        className={cn("text-xs whitespace-pre-wrap text-black/45", !expanded && "line-clamp-2")}
      >
        {note}
      </p>
      {(isOverflowing || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-[11px] font-semibold text-black/70 underline underline-offset-2"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

interface OnboardingStepRowProps {
  step: ResolvedStep;
  statusLegend: StatusLegend;
  isLast?: boolean;
}

export function OnboardingStepRow({ step, statusLegend, isLast }: OnboardingStepRowProps) {
  const description = getStepStatusDescription(step.status, statusLegend);

  return (
    <li
      className={cn(
        "flex flex-col gap-3 py-4",
        !isLast && "border-b border-black/10"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-baseline gap-4 text-[15px] text-black/60">
          <span className="shrink-0 font-semibold">
            {String(step.definition.order).padStart(2, "0")}
          </span>
          <span className="font-medium break-words">{step.definition.label}</span>
        </div>
        <StepStatusChip status={step.status} className="mt-0.5 shrink-0" title={description} />
      </div>
      {step.note && <NoteBlock note={step.note} />}
    </li>
  );
}
