import { cn } from "@/lib/format";

interface TotalPropertiesCardProps {
  total: number;
  live: number;
  inProgress: number;
  actionRequired: number;
}

/**
 * The bar chart reuses the same three status buckets shown in
 * LiveStatsCard (rather than an unrelated, hardcoded chart) so every
 * number on the dashboard traces back to real property data.
 */
export function TotalPropertiesCard({
  total,
  live,
  inProgress,
  actionRequired,
}: TotalPropertiesCardProps) {
  const bars = [
    { label: "Live", value: live },
    { label: "In Progress", value: inProgress },
    { label: "Action Required", value: actionRequired },
  ];
  const maxValue = Math.max(live, inProgress, actionRequired, 1);

  return (
    <div className="flex h-[252px] w-full flex-1 items-center justify-between gap-8 overflow-hidden rounded-[25px] bg-white py-[30px] pr-5 pl-[30px]">
      <div className="flex min-w-0 flex-col items-start gap-0.5">
        <p className="text-sm text-black/60">Total properties</p>
        <div className="flex items-end gap-2">
          <p className="text-[56px] leading-none font-medium text-black sm:text-[64px]">
            {total}
          </p>
          <p className="pb-1.5 text-base whitespace-nowrap text-black/60">
            {total === 1 ? "unit" : "units"}
          </p>
        </div>
      </div>
      <div
        className="flex h-[157px] shrink-0 items-end gap-[6px]"
        role="img"
        aria-label={`Property status distribution: ${live} live, ${inProgress} in progress, ${actionRequired} action required`}
      >
        {bars.map((bar) => {
          const heightPercent = Math.max((bar.value / maxValue) * 100, bar.value > 0 ? 22 : 10);
          const isLive = bar.label === "Live";
          return (
            <div
              key={bar.label}
              title={`${bar.label}: ${bar.value}`}
              className={cn(
                "w-[54px] rounded-2xl border border-solid transition-[height] duration-300 sm:w-[70px]",
                isLive ? "border-white/20 bg-neutral-800" : "border-black/10 bg-neutral-200/80"
              )}
              style={{ height: `${heightPercent}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}
