import { cache } from "react";
import { createClient } from "../supabase/server";

export const getCleanersByCity = cache(
  async (city: string, startingRange: number, endingRange: number) => {
    const supabase = await createClient();

    const {
      data: cleaners,
      count,
      error,
    } = await supabase
      .from("cleaners")
      .select("*", { count: "exact" })
      .eq("city", city)
      .range(startingRange, endingRange)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return { cleaners: cleaners ?? [], count: count ?? 0 };
  },
);

export const getCleaner = cache(async (id: string) => {
  const supabase = await createClient();

  const { data: cleaner, error } = await supabase
    .from("cleaners")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return cleaner;
});
