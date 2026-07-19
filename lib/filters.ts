export const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All status" },
  { value: "live", label: "Live" },
  { value: "in_progress", label: "In Progress" },
  { value: "action_required", label: "Action Required" },
] as const;

export type StatusFilterValue = (typeof STATUS_FILTER_OPTIONS)[number]["value"];

export const ALL_MONTHS_VALUE = "all";
