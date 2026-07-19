export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

/** "2026-07-25" -> "25 Jul 2026" */
export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return dateFormatter.format(date);
}

const monthYearFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
});

/** "2026-07-25" -> "July 2026" */
export function formatMonthYear(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return monthYearFormatter.format(date);
}

const monthShortFormatter = new Intl.DateTimeFormat("en-GB", { month: "short" });

/** "2026-07-25" -> "Jul" */
export function formatMonthShort(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return monthShortFormatter.format(date);
}

/** "2026-07-25" -> "2026-07", a stable sortable key for grouping by month. */
export function monthKey(isoDate: string): string {
  return isoDate.slice(0, 7);
}

export function titleCase(value: string): string {
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
