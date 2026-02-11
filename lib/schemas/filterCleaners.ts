import { z } from "zod";

export const filterSchema = z.object({
  priceRange: z.array(z.number()).length(2),
  minRating: z.number().min(0).max(5).optional(),
  minJobs: z.number().optional(),
  suppliesProvided: z.enum(["all", "true", "false"]),
  date: z.date().nullable(),
});

export type SuppliesOptions = "all" | "true" | "false";

export type FilterValues = z.infer<typeof filterSchema>;
