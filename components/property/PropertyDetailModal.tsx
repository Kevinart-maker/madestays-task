"use client";

import { useEffect, useRef, useState } from "react";
import { OnboardingStepRow } from "@/components/property/OnboardingStepRow";
import { BedIcon, ChevronDownIcon, CloseIcon } from "@/components/icons";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { OverallStatusPill } from "@/components/ui/StatusBadge";
import { cn, formatDate } from "@/lib/format";
import { countCompleteSteps, type PropertyEntry } from "@/lib/status";
import type { StatusLegend } from "@/lib/types";

interface PropertyDetailModalProps {
  entry: PropertyEntry | null;
  statusLegend: StatusLegend;
  onClose: () => void;
}

export function PropertyDetailModal({ entry, statusLegend, onClose }: PropertyDetailModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = entry !== null;

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!entry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-8">
      <button
        type="button"
        aria-label="Close property details"
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
      />

      <div className="relative w-full max-w-[860px]">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 z-10 flex size-10 items-center justify-center rounded-full bg-white text-black/70 shadow-lg transition-colors hover:bg-neutral-100 sm:-top-4 sm:-right-4"
        >
          <CloseIcon className="size-4" />
        </button>

        {/* Keyed by property id so switching the selected property (while a
            modal is already open) remounts with fresh, un-stale local state
            (the checklist starts expanded again) instead of carrying over
            state from the previous property via an effect. */}
        <ModalCard key={entry.property.id} entry={entry} statusLegend={statusLegend} />
      </div>
    </div>
  );
}

interface ModalCardProps {
  entry: PropertyEntry;
  statusLegend: StatusLegend;
}

function ModalCard({ entry, statusLegend }: ModalCardProps) {
  const [checklistOpen, setChecklistOpen] = useState(true);
  const { property, resolvedSteps, overallStatus } = entry;
  const completeCount = countCompleteSteps(resolvedSteps);
  const totalSteps = resolvedSteps.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${property.name} onboarding details`}
      className="flex max-h-[85vh] w-full flex-col gap-6 overflow-y-auto rounded-[28px] bg-white p-5 shadow-2xl sm:gap-8 sm:rounded-[32px] sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <h2 className="text-[26px] leading-tight font-semibold tracking-[-0.01em] text-black sm:text-[40px]">
            {property.name}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-sm text-black/60 sm:gap-4">
            <span>{property.location}</span>
            <span className="h-4 w-px bg-black/30" aria-hidden />
            <span className="flex items-center gap-1.5">
              <BedIcon className="size-4" />
              Bed: {property.bedrooms}
            </span>
            <span className="h-4 w-px bg-black/30" aria-hidden />
            <span>{formatDate(property.targetGoLiveDate)}</span>
          </div>
        </div>
        <OverallStatusPill status={overallStatus} className="shrink-0" />
      </div>

      <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-[24px] bg-neutral-100 sm:h-[380px] sm:rounded-[32px]">
        <PropertyImage src={property.image} alt={property.name} />
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setChecklistOpen((v) => !v)}
          aria-expanded={checklistOpen}
          className="flex w-full items-center justify-between gap-4 py-1 text-left"
        >
          <div className="flex flex-col gap-1">
            <span className="text-xl font-semibold tracking-[-0.01em] text-black/80 sm:text-[28px]">
              Onboarding Checklist
            </span>
            <span className="text-xs text-black/50">
              <span className="font-semibold text-black/70">
                {completeCount}/{totalSteps}
              </span>{" "}
              steps completed
            </span>
          </div>
          <ChevronDownIcon
            className={cn(
              "size-4 shrink-0 text-black/50 transition-transform duration-200",
              checklistOpen && "rotate-180"
            )}
          />
        </button>

        {checklistOpen && (
          <ul className="flex flex-col">
            {resolvedSteps.map((step, index) => (
              <OnboardingStepRow
                key={step.definition.id}
                step={step}
                statusLegend={statusLegend}
                isLast={index === resolvedSteps.length - 1}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
