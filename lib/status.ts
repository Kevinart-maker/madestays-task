import { titleCase } from "./format";
import type {
  OnboardingStepDefinition,
  OverallStatus,
  Property,
  PropertyStep,
  StatusLegend,
  StepStatus,
} from "./types";

export type StatusIconKey = "alert" | "clock" | "check" | "dashed" | "pause";

interface StepStatusMeta {
  label: string;
  icon: StatusIconKey;
  iconClassName: string;
  badgeClassName: string;
  textClassName: string;
}

/**
 * Badges all share the Figma pill style (dark translucent background, white
 * label) — the icon is what carries the status. Styling for the statuses
 * defined in statusLegend, plus real-world extras like "on_hold".
 */
const KNOWN_STEP_STATUS_META: Record<string, StepStatusMeta> = {
  complete: {
    label: "Complete",
    icon: "check",
    iconClassName: "",
    badgeClassName: "bg-black/60 text-white",
    textClassName: "text-emerald-700",
  },
  in_progress: {
    label: "In Progress",
    icon: "clock",
    iconClassName: "",
    badgeClassName: "bg-black/60 text-white",
    textClassName: "text-neutral-600",
  },
  action_required: {
    label: "Action Required",
    icon: "alert",
    iconClassName: "",
    badgeClassName: "bg-black/60 text-white",
    textClassName: "text-red-600",
  },
  not_started: {
    label: "Not Started",
    icon: "dashed",
    iconClassName: "",
    badgeClassName: "bg-black/40 text-white",
    textClassName: "text-neutral-400",
  },
  on_hold: {
    label: "On Hold",
    icon: "pause",
    iconClassName: "",
    badgeClassName: "bg-black/60 text-white",
    textClassName: "text-amber-700",
  },
};

const FALLBACK_STEP_STATUS_META: StepStatusMeta = {
  label: "Unknown",
  icon: "dashed",
  iconClassName: "",
  badgeClassName: "bg-black/40 text-white",
  textClassName: "text-neutral-500",
};

/**
 * Data is user/API supplied and may contain a status value outside the
 * documented legend (e.g. "on_hold" shows up on a real property in the
 * sample data). Always fall back to a readable, styled default instead of
 * crashing or rendering a blank badge.
 */
export function getStepStatusMeta(status: StepStatus): StepStatusMeta {
  const known = KNOWN_STEP_STATUS_META[status];
  if (known) return known;
  return { ...FALLBACK_STEP_STATUS_META, label: titleCase(status || "unknown") };
}

export function getStepStatusDescription(
  status: StepStatus,
  statusLegend: StatusLegend
): string | undefined {
  return statusLegend[status];
}

export interface ResolvedStep {
  definition: OnboardingStepDefinition;
  status: StepStatus;
  note?: string;
}

/**
 * Maps a property's sparse/unordered steps onto the canonical, ordered step
 * definitions. Missing steps (including properties with an empty steps
 * array, like Kingsgate Mews) default to "not_started" rather than being
 * silently dropped.
 */
export function resolveSteps(
  property: Property,
  stepDefinitions: OnboardingStepDefinition[]
): ResolvedStep[] {
  const byId = new Map<string, PropertyStep>(property.steps.map((step) => [step.id, step]));
  return [...stepDefinitions]
    .sort((a, b) => a.order - b.order)
    .map((definition) => {
      const match = byId.get(definition.id);
      return {
        definition,
        status: match?.status ?? "not_started",
        note: match?.note,
      };
    });
}

export function countCompleteSteps(resolvedSteps: ResolvedStep[]): number {
  return resolvedSteps.filter((step) => step.status === "complete").length;
}

interface OverallStatusMeta {
  label: string;
  icon: StatusIconKey;
  iconClassName: string;
  badgeClassName: string;
}

export const OVERALL_STATUS_META: Record<OverallStatus, OverallStatusMeta> = {
  live: {
    label: "Live",
    icon: "check",
    iconClassName: "",
    badgeClassName: "bg-black/60 text-white",
  },
  in_progress: {
    label: "In Progress",
    icon: "clock",
    iconClassName: "",
    badgeClassName: "bg-black/60 text-white",
  },
  action_required: {
    label: "Action Required",
    icon: "alert",
    iconClassName: "",
    badgeClassName: "bg-black/60 text-white",
  },
};

/**
 * Buckets a property into one of three states for the dashboard summary
 * and tabs, mirroring the three categories in the design (Live / In
 * Progress / Action Required):
 *  - any step blocked on the owner -> action_required (highest priority)
 *  - every canonical step complete -> live
 *  - otherwise (including a property with no steps at all) -> in_progress
 */
export function getOverallStatus(resolvedSteps: ResolvedStep[]): OverallStatus {
  if (resolvedSteps.some((step) => step.status === "action_required")) {
    return "action_required";
  }
  if (resolvedSteps.length > 0 && resolvedSteps.every((step) => step.status === "complete")) {
    return "live";
  }
  return "in_progress";
}

export interface PropertyEntry {
  property: Property;
  resolvedSteps: ResolvedStep[];
  overallStatus: OverallStatus;
}
