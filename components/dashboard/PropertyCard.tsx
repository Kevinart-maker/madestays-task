import { BedIcon, LocationPinIcon } from "@/components/icons";
import { ClampText } from "@/components/ui/ClampText";
import { ProgressiveBlur } from "@/components/ui/ProgressiveBlur";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { OverallStatusPill } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/format";
import { countCompleteSteps, type PropertyEntry } from "@/lib/status";

interface PropertyCardProps {
  entry: PropertyEntry;
  totalSteps: number;
  onSelect: (propertyId: string) => void;
}

export function PropertyCard({ entry, totalSteps, onSelect }: PropertyCardProps) {
  const { property, resolvedSteps, overallStatus } = entry;
  const completeCount = countCompleteSteps(resolvedSteps);

  return (
    <button
      type="button"
      onClick={() => onSelect(property.id)}
      className="group relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-[24px] bg-neutral-900 text-left shadow-sm transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
        <PropertyImage src={property.image} alt={property.name} />
      </div>

      {/* Blends the photo into the text below it, sharp at the top and
          smoothly increasing to fully blurred at the bottom — not a flat
          blur panel with a hard edge. */}
      <ProgressiveBlur />

      <div className="absolute top-4 left-4">
        <OverallStatusPill status={overallStatus} />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-5 pt-16 pb-5 text-white">
        <div className="flex min-w-0 flex-col gap-1.5">
          <ClampText
            as="h3"
            text={property.name}
            lines={1}
            className="text-lg font-semibold tracking-[-0.01em]"
          />
          <div className="flex min-w-0 items-center gap-1.5 text-white/70">
            <LocationPinIcon className="size-3.5 shrink-0" />
            <ClampText as="span" text={property.location} lines={1} className="text-sm" />
          </div>
          <div className="flex items-center gap-1.5 text-white/70">
            <BedIcon className="size-4 shrink-0" />
            <span className="text-sm">Bed: {property.bedrooms}</span>
          </div>
        </div>

        <div className="h-px w-full bg-white/20" />

        <div className="flex items-center justify-between gap-2 text-sm text-white/70">
          <p className="min-w-0 truncate">
            <span className="font-semibold text-white">
              {completeCount}/{totalSteps}
            </span>{" "}
            steps completed
          </p>
          <p className="shrink-0">{formatDate(property.targetGoLiveDate)}</p>
        </div>
      </div>
    </button>
  );
}
