import { z } from "zod";
import { VALID_CITIES } from "../constants/cities";

export const CustomerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Name is too short")
    .max(50, "Name is too long")
    .regex(/^[^0-9]*$/, "Names cannot contain numbers") // Simple: No numbers allowed
    .refine((val) => val.split(" ").filter(Boolean).length >= 2, {
      message: "Please enter at least a first and last name",
    }),

  city: z
    .string()
    .min(1, "Please choose a city")
    .refine((val) => VALID_CITIES.includes(val as any), {
      message: "Please select a valid city",
    }),

  address: z
    .string()
    .trim()
    .min(5, "Address is too short")
    .max(100, "Address is too long")
    .regex(/\d/, "Please include a building or apartment number"),

  postCode: z
    .string()
    .trim()
    .regex(/^\d{2}-\d{3}$/, "Invalid post code format"),

  phone: z
    .string()
    .trim()
    .regex(/^\d{3} \d{3} \d{3}$/, "Invalid phone number format"),

  hasPets: z.boolean(),
});

export type CustomerFormValues = z.infer<typeof CustomerSchema>;
