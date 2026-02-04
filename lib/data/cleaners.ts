import { Opinion, OpinionSortOption } from "@/types";
import { cache } from "react";
import z from "zod";
import { createClient } from "../supabase/server";
import { getCurrentCustomer } from "./customer";

export const getCleanersByCity = async (
  city: string,
  startingRange: number,
  endingRange: number,
) => {
  const supabase = await createClient();

  // Get the total count first
  const { count: totalCount } = await supabase
    .from("cleaners")
    .select("*", { count: "exact", head: true })
    .eq("city", city);

  if (!totalCount || totalCount === 0) {
    return { cleaners: [], count: 0 };
  }

  // Try to get the actual data
  const { data: cleaners, error } = await supabase
    .from("cleaners")
    .select("*")
    .eq("city", city)
    .order("created_at", { ascending: false })
    .range(startingRange, endingRange);

  // Still return the totalCount so the redirect logic can work.
  if (error) {
    return { cleaners: [], count: totalCount ?? 0 };
  }

  return { cleaners: cleaners ?? [], count: totalCount ?? 0 };
};

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
    const customer = await getCurrentCustomer();

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
          cleaner_id,
          customer_id,
          content,
          created_at,
          likes_count,
          dislikes_count,
          customers (full_name),
          opinion_likes (type)
        `,
        { count: "exact" },
      )
      .eq("cleaner_id", id)
      .eq("opinion_likes.customer_id", customer.id)
      .range(startingRange, endingRange)
      .order(column, { ascending });

    if (error) {
      throw new Error(error.message);
    }

    // Flatten the 'opinion_likes' join into a single 'userVote' string.
    // This simplifies client-side state and validations by converting
    // the database array structure into a flat 'like' | 'dislike' | null.
    const formattedOpinions = opinions.map((op) => {
      const { opinion_likes, ...rest } = op;

      return {
        ...rest,
        userVote: (opinion_likes?.[0]?.type as Opinion["userVote"]) ?? null,
      };
    });

    return { opinions: formattedOpinions ?? [], count: count ?? 0 };
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
