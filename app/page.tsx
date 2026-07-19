import { Suspense } from "react";
import { DashboardDataLoader } from "@/components/dashboard/DashboardDataLoader";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSkeleton";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-start gap-8 bg-[#f7f7f7] px-4 py-4 sm:px-8 sm:py-6">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardDataLoader />
      </Suspense>
    </div>
  );
}