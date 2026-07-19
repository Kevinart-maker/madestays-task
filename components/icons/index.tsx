import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

export function BellIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15.86 12.98a3.6 3.6 0 0 1-.46-1.59V7.23a6.48 6.48 0 0 0-13 0v4.16a3.6 3.6 0 0 1-.46 1.59L.9 14.72a.86.86 0 0 0 .74 1.53h14.72a.86.86 0 0 0 .74-1.53l-1.24-1.74Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.9 19.25h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.7 1.34a1.7 1.7 0 0 1 1.6 0l6.04 3.13c.62.32 1.06.94 1.14 1.65l.03.36v7.04c0 .74-.38 1.42-1 1.83l-.17.1-6.05 3.13a1.7 1.7 0 0 1-1.44.06l-.16-.06L2.65 15.5A2.06 2.06 0 0 1 1.5 13.7V6.55c0-.74.38-1.42 1-1.83l.17-.1L8.7 1.34Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="9.77" r="3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 6.5h12" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="7.2" cy="7.2" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M14 14l-3.2-3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function LocationPinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8 15s5-4.6 5-8.6A5 5 0 0 0 3 6.4C3 10.4 8 15 8 15Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="6.4" r="1.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function BedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.5 15V6.75A1.75 1.75 0 0 1 3.25 5h2.5A1.75 1.75 0 0 1 7.5 6.75V9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 15v-2.75A1.75 1.75 0 0 1 3.25 10.5h11.5a1.75 1.75 0 0 1 1.75 1.75V15"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M1.5 15v1.5M16.5 15v1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path
        d="M10 9h5.25A1.25 1.25 0 0 1 16.5 10.25V12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="4.5" cy="7.5" r="0.9" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 3l10 10M13 3L3 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ImageOffIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.5 15.5l3.6-4 3 3.2 2-2.2 2.4 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.2" cy="9" r="1.3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 20.5l17-17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Filled red alert-circle used on "Action Required" badges — always red, not currentColor. */
export function AlertCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="8" cy="8" r="8" fill="#EF4444" />
      <path
        d="M8 4.1c.5 0 .9.42.87.92l-.28 4.32a.59.59 0 0 1-1.18 0L7.13 5.02A.87.87 0 0 1 8 4.1Z"
        fill="white"
      />
      <circle cx="8" cy="11.35" r="0.95" fill="white" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 4.8V8.2l2.3 1.35"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M5.2 8.15l1.85 1.85 3.75-3.9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CircleDashedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle
        cx="8"
        cy="8"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeDasharray="2.3 2.1"
      />
    </svg>
  );
}

export function PauseCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.6 5.7v4.6M9.4 5.7v4.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
