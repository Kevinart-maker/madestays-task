import { cn } from "@/lib/format";

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-black/[0.06]", className)} />;
}

/**
 * Mirrors the real dashboard's shape (header, two stat cards, filters bar,
 * property tabs, card grid) so the loading state doesn't jump around once
 * the real content swaps in.
 */
export function DashboardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-8" aria-busy="true" aria-live="polite">
      <div className="flex w-full items-center justify-between">
        <SkeletonBlock className="h-9 w-36 rounded-lg" />
        <div className="flex items-center gap-6">
          <SkeletonBlock className="size-5 rounded-full" />
          <SkeletonBlock className="size-5 rounded-full" />
          <SkeletonBlock className="size-8 rounded-full" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-[15px] lg:flex-row">
        <SkeletonBlock className="h-[220px] w-full flex-1 rounded-[25px] sm:h-[252px]" />
        <SkeletonBlock className="h-[220px] w-full flex-1 rounded-[15px] sm:h-[252px]" />
      </div>

      <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SkeletonBlock className="h-5 w-28 rounded-full" />
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <SkeletonBlock className="h-9 w-full rounded-full sm:w-[171px]" />
          <SkeletonBlock className="h-9 w-full rounded-full sm:w-[171px]" />
          <SkeletonBlock className="h-9 w-full rounded-full sm:w-[171px]" />
        </div>
      </div>

      <div className="flex w-full flex-col gap-6 rounded-[15px] bg-white px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SkeletonBlock className="h-5 w-28" />
          <div className="flex flex-wrap gap-2">
            <SkeletonBlock className="h-7 w-24 rounded-full" />
            <SkeletonBlock className="h-7 w-32 rounded-full" />
            <SkeletonBlock className="h-7 w-16 rounded-full" />
            <SkeletonBlock className="h-7 w-28 rounded-full" />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonBlock key={index} className="aspect-[3/4] w-full rounded-[24px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
