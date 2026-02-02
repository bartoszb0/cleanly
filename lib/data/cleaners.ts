import { OpinionSortOption } from "@/types";
import { cache } from "react";
import z from "zod";
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
  if (!z.uuid().safeParse(id).success) return null;

  const supabase = await createClient();

  const { data: cleaner, error } = await supabase
    .from("cleaners")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return cleaner;
});

export const getCleanerOpinions = cache(
  async (
    id: string,
    startingRange: number,
    endingRange: number,
    sortBy: OpinionSortOption = "newest",
  ) => {
    if (!z.uuid().safeParse(id).success) return null;

    const supabase = await createClient();

    let column = "created_at";
    let ascending = false;

    if (sortBy === "oldest") {
      ascending = true;
    } else if (sortBy === "highest") {
      column = "rating";
      ascending = false;
    } else if (sortBy === "lowest") {
      column = "rating";
      ascending = true;
    }

    const {
      data: opinions,
      error,
      count,
    } = await supabase
      .from("opinions")
      .select(
        `
          id,
          rating,
          content,
          created_at,
          customers (
            full_name
          )
        `,
        { count: "exact" },
      )
      .eq("cleaner_id", id)
      .range(startingRange, endingRange)
      .order(column, { ascending });

    if (error) {
      throw new Error(error.message);
    }

    return { opinions: opinions ?? [], count: count ?? 0 };
  },
);

export const getCleanerRating = cache(async (id: string) => {
  if (!z.uuid().safeParse(id).success) return { average: 0, total: 0 };

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("opinions")
    .select("rating")
    .eq("cleaner_id", id);

  if (error || !data || data.length === 0) return { average: 0, total: 0 };

  const total = data.length;
  const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
  const average = sum / total;

  return { average, total };
});
