import { EmptyState } from "@/components/dashboard/EmptyState";
import { PropertyCard } from "@/components/dashboard/PropertyCard";
import type { PropertyEntry } from "@/lib/status";

interface PropertyGridProps {
  entries: PropertyEntry[];
  totalSteps: number;
  onSelectProperty: (propertyId: string) => void;
}

export function PropertyGrid({ entries, totalSteps, onSelectProperty }: PropertyGridProps) {
  if (entries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <PropertyCard
          key={entry.property.id}
          entry={entry}
          totalSteps={totalSteps}
          onSelect={onSelectProperty}
        />
      ))}
    </div>
  );
}
