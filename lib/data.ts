import { vaultData } from "./mock-data";
import type { VaultData } from "./types";

const SIMULATED_LATENCY_MS = 2300;

/**
 * Stands in for a real API call. The artificial delay lets the Suspense
 * boundary in app/page.tsx actually show the skeleton instead of resolving
 * instantly.
 */
export async function getDashboardData(): Promise<VaultData> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
  return vaultData;
}
