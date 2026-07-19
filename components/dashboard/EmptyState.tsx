import { SearchIcon } from "@/components/icons";

export function EmptyState() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-black/10 px-6 py-16 text-center">
      <div className="flex size-11 items-center justify-center rounded-full bg-neutral-100 text-black/40">
        <SearchIcon className="size-5" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-black/70">No properties match your filters</p>
        <p className="text-xs text-black/50">Try adjusting the status, date, or search filters.</p>
      </div>
    </div>
  );
}
