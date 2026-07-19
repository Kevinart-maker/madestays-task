"use client";

import { useMemo, useState } from "react";
import type { DropdownOption } from "@/components/dashboard/FilterDropdown";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FiltersBar } from "@/components/dashboard/FiltersBar";
import { PropertiesSection } from "@/components/dashboard/PropertiesSection";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { PropertyDetailModal } from "@/components/property/PropertyDetailModal";
import { ALL_MONTHS_VALUE } from "@/lib/filters";
import { formatMonthYear, monthKey } from "@/lib/format";
import { computeDashboardStats } from "@/lib/stats";
import { getOverallStatus, resolveSteps, type PropertyEntry } from "@/lib/status";
import type { VaultData } from "@/lib/types";

interface DashboardProps {
  data: VaultData;
}

export function Dashboard({ data }: DashboardProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState(ALL_MONTHS_VALUE);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const entries: PropertyEntry[] = useMemo(
    () =>
      data.properties.map((property) => {
        const resolvedSteps = resolveSteps(property, data.onboardingStepDefinitions);
        return { property, resolvedSteps, overallStatus: getOverallStatus(resolvedSteps) };
      }),
    [data.properties, data.onboardingStepDefinitions]
  );

  const stats = useMemo(() => computeDashboardStats(data), [data]);

  const counts = useMemo(() => {
    const base: Record<string, number> = {
      all: entries.length,
      live: 0,
      in_progress: 0,
      action_required: 0,
    };
    for (const entry of entries) base[entry.overallStatus] += 1;
    return base;
  }, [entries]);

  const monthOptions: DropdownOption[] = useMemo(() => {
    const seen = new Map<string, string>();
    for (const property of data.properties) {
      const key = monthKey(property.targetGoLiveDate);
      if (!seen.has(key)) seen.set(key, formatMonthYear(property.targetGoLiveDate));
    }
    const sortedMonths = [...seen.entries()].sort(([a], [b]) => a.localeCompare(b));
    return [
      { value: ALL_MONTHS_VALUE, label: "All dates" },
      ...sortedMonths.map(([value, label]) => ({ value, label })),
    ];
  }, [data.properties]);

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      if (statusFilter !== "all" && entry.overallStatus !== statusFilter) return false;
      if (
        monthFilter !== ALL_MONTHS_VALUE &&
        monthKey(entry.property.targetGoLiveDate) !== monthFilter
      ) {
        return false;
      }
      if (normalizedSearch) {
        const haystack = `${entry.property.name} ${entry.property.location}`.toLowerCase();
        if (!haystack.includes(normalizedSearch)) return false;
      }
      return true;
    });
  }, [entries, statusFilter, monthFilter, normalizedSearch]);

  const activeFilterCount =
    (statusFilter !== "all" ? 1 : 0) +
    (monthFilter !== ALL_MONTHS_VALUE ? 1 : 0) +
    (normalizedSearch ? 1 : 0);

  const selectedEntry = entries.find((entry) => entry.property.id === selectedPropertyId) ?? null;

  return (
    <>
      <DashboardHeader ownerName={data.owner.name} />
      <StatsOverview stats={stats} />
      <FiltersBar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        monthFilter={monthFilter}
        onMonthFilterChange={setMonthFilter}
        monthOptions={monthOptions}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        activeFilterCount={activeFilterCount}
      />
      <PropertiesSection
        entries={filteredEntries}
        counts={counts}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        totalSteps={data.onboardingStepDefinitions.length}
        onSelectProperty={setSelectedPropertyId}
      />
      <PropertyDetailModal
        entry={selectedEntry}
        statusLegend={data.statusLegend}
        onClose={() => setSelectedPropertyId(null)}
      />
    </>
  );
}
