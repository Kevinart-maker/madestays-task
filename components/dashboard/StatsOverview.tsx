import { LiveStatsCard } from "@/components/dashboard/LiveStatsCard";
import { TotalPropertiesCard } from "@/components/dashboard/TotalPropertiesCard";
import type { DashboardStats } from "@/lib/stats";

export function StatsOverview({ stats }: { stats: DashboardStats }) {
  return (
    <div className="flex w-full flex-col items-stretch gap-[15px] lg:flex-row">
      <TotalPropertiesCard
        total={stats.total}
        live={stats.live}
        inProgress={stats.inProgress}
        actionRequired={stats.actionRequired}
      />
      <LiveStatsCard
        live={stats.live}
        inProgress={stats.inProgress}
        actionRequired={stats.actionRequired}
        monthlyProgress={stats.monthlyProgress}
      />
    </div>
  );
}
