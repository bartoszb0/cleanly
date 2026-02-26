import { z } from "zod";

export const ReviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  review: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review must be 500 characters at max"),
});

export type ReviewFormValues = z.infer<typeof ReviewSchema>;
