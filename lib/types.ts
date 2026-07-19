export type StepId =
  | "property-details"
  | "photography"
  | "safety-certs"
  | "insurance"
  | "ownership"
  | "payout"
  | "pricing"
  | "channels"
  | "welcome-guide"
  | "agreement";

/**
 * The canonical set of statuses is defined by `statusLegend` in the data source.
 * Real-world data can still contain values outside that set (e.g. "on_hold"),
 * so this type is intentionally wider than the legend to keep step rendering safe.
 */
export type StepStatus =
  | "complete"
  | "in_progress"
  | "action_required"
  | "not_started"
  | (string & {});

export type OverallStatus = "live" | "in_progress" | "action_required";

export interface Owner {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  accountManager: string;
}

export interface OnboardingStepDefinition {
  id: StepId;
  label: string;
  order: number;
}

export type StatusLegend = Record<string, string>;

export interface PropertyStep {
  id: StepId;
  status: StepStatus;
  note?: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  bedrooms: number;
  image: string;
  targetGoLiveDate: string;
  steps: PropertyStep[];
}

export interface VaultData {
  owner: Owner;
  onboardingStepDefinitions: OnboardingStepDefinition[];
  statusLegend: StatusLegend;
  properties: Property[];
}
