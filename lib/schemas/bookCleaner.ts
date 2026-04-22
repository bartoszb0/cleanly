import { z } from "zod";
import {
  VALID_DURATIONS,
  VALID_HOURS,
  VALID_MINUTES,
} from "../constants/booking";

export const bookingSchema = z.object({
  date: z.date("Please select a date"),

  startHour: z
    .string()
    .refine(
      (val) => VALID_HOURS.includes(val),
      "Please select a valid hour (7-20)",
    ),

  startMinute: z
    .string()
    .refine(
      (val) => VALID_MINUTES.includes(val),
      "Please select a valid minute interval",
    ),

  duration: z
    .string()
    .refine(
      (val) => VALID_DURATIONS.includes(val),
      "Duration must be between 1 and 6 hours",
    ),
});

export type BookingValues = z.infer<typeof bookingSchema>;
