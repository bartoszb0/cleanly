import { statusConfig } from "@/components/cleaner-dashboard/dashboard/todays-jobs";
import { Tables } from "@/types/supabase";
import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  const constrained = digits.slice(0, 9);

  if (constrained.length <= 3) return constrained;
  if (constrained.length <= 6) {
    return `${constrained.slice(0, 3)} ${constrained.slice(3)}`;
  }
  return `${constrained.slice(0, 3)} ${constrained.slice(3, 6)} ${constrained.slice(6)}`;
};

export const formatPostCode = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");

  // Limit to 5 digits
  const constrained = digits.slice(0, 5);

  // Apply mask: 00-000
  if (constrained.length > 2) {
    return `${constrained.slice(0, 2)}-${constrained.slice(2)}`;
  }

  return constrained;
};

export function getUppercaseCityName(city: string) {
  return city.charAt(0).toUpperCase() + city.slice(1);
}

export function formatDate(
  date: string | Date,
  variant: "full" | "short" = "short",
) {
  const formats = {
    full: "yyyy-MM-dd",
    short: "MMMM yyyy",
  };

  const dateObj = typeof date === "string" ? parseISO(date) : date;

  return format(dateObj, formats[variant]);
}

export function getPaginationRange(page: number, itemsPerPage: number) {
  const startingRange = (page - 1) * itemsPerPage;
  const endingRange = startingRange + itemsPerPage - 1;

  return { startingRange, endingRange };
}

export function parseUrlDate(dateStr: string | null) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return !isNaN(d.getTime()) ? d : null;
}

export function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

export function getDisplayStatus(
  job: Tables<"jobs">,
): keyof typeof statusConfig {
  if (job.status === "cancelled") return "cancelled";
  if (job.status === "completed") return "completed";

  const now = new Date();
  const start = new Date(job.scheduled_at);
  const end = new Date(job.end_time);

  if (now >= start && now <= end) return "in_progress";

  return "upcoming";
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}
