import type { MonthProgress } from "@/lib/stats";

interface LiveStatsCardProps {
  live: number;
  inProgress: number;
  actionRequired: number;
  monthlyProgress: MonthProgress[];
}

export function LiveStatsCard({
  live,
  inProgress,
  actionRequired,
  monthlyProgress,
}: LiveStatsCardProps) {
  const stats = [
    { label: "Live properties", value: live },
    { label: "In progress", value: inProgress },
    { label: "Needs attention", value: actionRequired },
  ];

  return (
    <div className="flex h-auto w-full flex-1 flex-col justify-between gap-8 overflow-hidden rounded-[15px] bg-white p-6 sm:h-[252px] sm:p-[30px]">
      <div className="flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-8">
            {i > 0 && <div className="hidden h-10 w-px bg-black/10 sm:block" aria-hidden />}
            <div className="flex flex-col gap-2">
              <p className="text-sm whitespace-nowrap text-black/60">{stat.label}</p>
              <div className="flex items-end gap-2">
                <p className="text-[32px] leading-none font-medium text-black sm:text-[36px]">
                  {String(stat.value).padStart(2, "0")}
                </p>
                <p className="pb-1 text-base whitespace-nowrap text-black/60">
                  {stat.value === 1 ? "unit" : "units"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {monthlyProgress.length > 0 && (
        <div className="scrollbar-none flex w-full items-end gap-6 overflow-x-auto">
          {monthlyProgress.map((month) => (
            <div
              key={month.key}
              title={`${month.label}: ${month.percent}% average progress across properties targeting go-live that month`}
              className="flex min-w-[64px] flex-1 flex-col gap-1.5"
            >
              <p className="text-sm font-medium whitespace-nowrap text-black/60">{month.label}</p>
              <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-3 rounded-full bg-neutral-800 transition-[width] duration-300"
                  style={{ width: `${month.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
