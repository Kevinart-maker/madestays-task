"use client";

import { cn } from "@/lib/format";

const TABS = [
  { value: "all", label: "All Properties" },
  { value: "action_required", label: "Action Required" },
  { value: "live", label: "Live" },
  { value: "in_progress", label: "In Progress" },
] as const;

interface PropertyTabsProps {
  active: string;
  counts: Record<string, number>;
  onChange: (value: string) => void;
}

export function PropertyTabs({ active, counts, onChange }: PropertyTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter properties by status"
      className="flex flex-wrap items-center gap-2"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-2 text-[10px] font-medium whitespace-nowrap transition-colors",
              isActive ? "bg-black/10 text-black/70" : "text-black/60 hover:bg-black/5"
            )}
          >
            {tab.label}
            {tab.value !== "all" && (
              <span
                className={cn(
                  "flex size-[15px] items-center justify-center rounded-full border border-solid text-[10px]",
                  isActive ? "border-black/70 text-black/70" : "border-black/60 text-black/60"
                )}
              >
                {counts[tab.value] ?? 0}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
