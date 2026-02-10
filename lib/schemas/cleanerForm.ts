import { z } from "zod";
import { VALID_CITIES, ValidCity } from "../constants/cities";

export const CleanerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name is too short")
    .max(50, "Name is too long")
    .regex(
      /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s'-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes",
    ),

  bio: z
    .string()
    .trim()
    .min(20, "Bio is too short")
    .max(500, "Bio cannot exceed 500 characters."),

  // avatar

  hourly_rate: z.coerce
    .number("Hourly rate is required")
    .min(1, "Hourly rate must be positive")
    .max(300, "Hourly rate cannot exceed 300PLN")
    .multipleOf(0.01, "Maximum 2 decimal places allowed"),

  city: z
    .string()
    .min(1, "Please choose a city")
    .refine((val) => VALID_CITIES.includes(val as ValidCity), {
      message: "Please select a valid city",
    }),

  phone: z
    .string()
    .trim()
    .regex(/^\d{3} \d{3} \d{3}$/, "Invalid phone number format"),

  supplies_provided: z.boolean(),
});

export type CleanerFormValues = z.input<typeof CleanerSchema>;
