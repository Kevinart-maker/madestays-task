import { PropertyGrid } from "@/components/dashboard/PropertyGrid";
import { PropertyTabs } from "@/components/dashboard/PropertyTabs";
import type { PropertyEntry } from "@/lib/status";

interface PropertiesSectionProps {
  entries: PropertyEntry[];
  counts: Record<string, number>;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  totalSteps: number;
  onSelectProperty: (propertyId: string) => void;
}

export function PropertiesSection({
  entries,
  counts,
  statusFilter,
  onStatusFilterChange,
  totalSteps,
  onSelectProperty,
}: PropertiesSectionProps) {
  return (
    <section className="flex w-full flex-col gap-6 rounded-[15px] bg-white px-4 py-5 sm:px-6 sm:py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="px-1 text-base font-medium text-black/60">All Properties</h2>
        <PropertyTabs active={statusFilter} counts={counts} onChange={onStatusFilterChange} />
      </div>
      <PropertyGrid entries={entries} totalSteps={totalSteps} onSelectProperty={onSelectProperty} />
    </section>
  );
}
