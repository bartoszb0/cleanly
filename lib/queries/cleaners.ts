import { cache } from "react";
import { createClient } from "../supabase/server";

export const getCleanersByCity = cache(
  async (city: string, startingRange: number, endingRange: number) => {
    const supabase = await createClient();

    const { data: cleaners, count } = await supabase
      .from("cleaners")
      .select("*", { count: "exact" })
      .eq("city", city)
      .range(startingRange, endingRange)
      .order("created_at", { ascending: false });

    return { cleaners: cleaners ?? [], count: count };
  },
);
