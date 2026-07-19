import { formatMonthShort, monthKey } from "./format";
import { countCompleteSteps, getOverallStatus, resolveSteps } from "./status";
import type { VaultData } from "./types";

export interface MonthProgress {
  key: string;
  label: string;
  percent: number;
}

export interface DashboardStats {
  total: number;
  live: number;
  inProgress: number;
  actionRequired: number;
  monthlyProgress: MonthProgress[];
}

/**
 * Every number here is derived live from the properties/steps data rather
 * than hardcoded, so the summary cards stay correct as the underlying data
 * changes.
 */
export function computeDashboardStats(data: VaultData): DashboardStats {
  let live = 0;
  let inProgress = 0;
  let actionRequired = 0;

  const monthTotals = new Map<string, { sumPercent: number; count: number; label: string }>();
  const stepCount = data.onboardingStepDefinitions.length;

  for (const property of data.properties) {
    const resolved = resolveSteps(property, data.onboardingStepDefinitions);
    const status = getOverallStatus(resolved);
    if (status === "live") live += 1;
    else if (status === "action_required") actionRequired += 1;
    else inProgress += 1;

    const key = monthKey(property.targetGoLiveDate);
    const percent = stepCount > 0 ? (countCompleteSteps(resolved) / stepCount) * 100 : 0;
    const entry = monthTotals.get(key) ?? {
      sumPercent: 0,
      count: 0,
      label: formatMonthShort(property.targetGoLiveDate),
    };
    entry.sumPercent += percent;
    entry.count += 1;
    monthTotals.set(key, entry);
  }

  const monthlyProgress: MonthProgress[] = [...monthTotals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, { sumPercent, count, label }]) => ({
      key,
      label,
      percent: Math.round(sumPercent / count),
    }));

  return {
    total: data.properties.length,
    live,
    inProgress,
    actionRequired,
    monthlyProgress,
  };
}
