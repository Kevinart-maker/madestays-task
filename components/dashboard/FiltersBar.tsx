"use client";

import { FilterDropdown, type DropdownOption } from "@/components/dashboard/FilterDropdown";
import { SearchInput } from "@/components/dashboard/SearchInput";
import { CalendarIcon, ChevronDownIcon } from "@/components/icons";
import { STATUS_FILTER_OPTIONS } from "@/lib/filters";

interface FiltersBarProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  monthFilter: string;
  onMonthFilterChange: (value: string) => void;
  monthOptions: DropdownOption[];
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  activeFilterCount: number;
}

export function FiltersBar({
  statusFilter,
  onStatusFilterChange,
  monthFilter,
  onMonthFilterChange,
  monthOptions,
  searchQuery,
  onSearchQueryChange,
  activeFilterCount,
}: FiltersBarProps) {
  return (
    <div className="flex w-full flex-col items-start gap-4 px-1 py-1 sm:flex-row sm:items-center sm:justify-between sm:px-[22px] sm:py-[5px]">
      <div className="flex items-center gap-1.5">
        <p className="text-base font-medium text-black/60">Active filters</p>
        <span className="flex size-[15px] items-center justify-center rounded-full bg-neutral-800 text-[9px] font-medium text-white">
          {activeFilterCount}
        </span>
      </div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-3.5">
        <FilterDropdown
          placeholder="All status"
          value={statusFilter}
          options={STATUS_FILTER_OPTIONS as unknown as DropdownOption[]}
          onChange={onStatusFilterChange}
          icon={<ChevronDownIcon className="size-4 text-black/60" />}
          isActive={statusFilter !== "all"}
        />
        <FilterDropdown
          placeholder="All dates"
          value={monthFilter}
          options={monthOptions}
          onChange={onMonthFilterChange}
          icon={<CalendarIcon className="size-4 text-black/60" />}
          isActive={monthFilter !== "all"}
        />
        <SearchInput value={searchQuery} onChange={onSearchQueryChange} />
      </div>
    </div>
  );
}
