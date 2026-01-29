import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
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

export function formatDate(date: string) {
  const formattedDate = dayjs(date).format("YYYY-MM-DD");
  return formattedDate;
}
