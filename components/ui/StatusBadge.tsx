import type { ComponentType } from "react";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  CircleDashedIcon,
  ClockIcon,
  PauseCircleIcon,
} from "@/components/icons";
import { cn } from "@/lib/format";
import { OVERALL_STATUS_META, getStepStatusMeta, type StatusIconKey } from "@/lib/status";
import type { OverallStatus, StepStatus } from "@/lib/types";

const ICON_BY_KEY: Record<StatusIconKey, ComponentType<{ className?: string }>> = {
  alert: AlertCircleIcon,
  clock: ClockIcon,
  check: CheckCircleIcon,
  dashed: CircleDashedIcon,
  pause: PauseCircleIcon,
};

interface OverallStatusPillProps {
  status: OverallStatus;
  className?: string;
}

/** Dark pill badge with a status icon, used over the property card photo and in the detail modal. */
export function OverallStatusPill({ status, className }: OverallStatusPillProps) {
  const meta = OVERALL_STATUS_META[status];
  const Icon = ICON_BY_KEY[meta.icon];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium backdrop-blur-sm",
        meta.badgeClassName,
        className
      )}
    >
      <Icon className={cn("size-[13px] shrink-0", meta.iconClassName)} />
      {meta.label}
    </span>
  );
}

interface StepStatusChipProps {
  status: StepStatus;
  className?: string;
  /** Shown as a native tooltip, e.g. the statusLegend description for this status. */
  title?: string;
}

/** Same dark pill + icon language as OverallStatusPill, used for individual onboarding steps. */
export function StepStatusChip({ status, className, title }: StepStatusChipProps) {
  const meta = getStepStatusMeta(status);
  const Icon = ICON_BY_KEY[meta.icon];
  return (
    <span
      title={title}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium",
        meta.badgeClassName,
        className
      )}
    >
      <Icon className={cn("size-[13px] shrink-0", meta.iconClassName)} />
      {meta.label}
    </span>
  );
}
