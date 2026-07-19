import { Dashboard } from "@/components/dashboard/Dashboard";
import { getDashboardData } from "@/lib/data";

/**
 * Server Component that awaits the (artificially delayed) data fetch.
 * Rendered inside a Suspense boundary in app/page.tsx so the skeleton
 * fallback is what actually paints first.
 */
export async function DashboardDataLoader() {
  const data = await getDashboardData();
  return <Dashboard data={data} />;
}
