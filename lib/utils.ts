import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const textUpperCase = (text: string | null) =>
  text &&
  text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

//Form input key canceler
export const handleFormKeys: React.KeyboardEventHandler<HTMLFormElement> = (
  e,
) => {
  // Ctrl+S / Cmd+S banned
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
    e.preventDefault();
    return;
  }

  if (e.key !== "Enter") return;

  const form = e.currentTarget;
  const focusables = Array.from(
    form.querySelectorAll<HTMLElement>(
      'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled])',
    ),
  ).filter((el) => el.offsetParent !== null);

  const i = focusables.indexOf(e.target as HTMLElement);
  const next = focusables[i + 1];

  if (next) {
    e.preventDefault();
    next.focus();
    (next as HTMLInputElement).select?.();
  }
};

export function toTRDateString(date: Date): string {
  const formatted = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date); //  "2025-11-30"

  return formatted;
}
export function getTrDateNDaysAgoISO(daysAgo: number): string {
  const dateNowTr = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" }),
  );
  dateNowTr.setDate(dateNowTr.getDate() - daysAgo);
  return toTRDateString(dateNowTr);
}
