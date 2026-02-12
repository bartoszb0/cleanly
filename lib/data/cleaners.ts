import { Opinion, OpinionSortOption } from "@/types";
import { format } from "date-fns";
import { cache } from "react";
import z from "zod";
import { FilterValues } from "../schemas/filterCleaners";
import { createClient } from "../supabase/server";
import { getCurrentCustomer } from "./customer";

export const getCleanersByCity = async (
  city: string,
  startingRange: number,
  endingRange: number,
  filters: FilterValues,
  searchName?: string,
  sortBy?: string,
) => {
  const supabase = await createClient();

  let busyCleanerIds: string[] = [];

  if (filters.date) {
    const formattedDate = format(filters.date, "yyyy-MM-dd");
    const { data: busyData } = await supabase
      .from("unavailability")
      .select("cleaner_id")
      .eq("off_date", formattedDate);

    busyCleanerIds = busyData?.map((item) => item.cleaner_id) || [];
  }

  // The Single Source of Truth for Filtering
  const applyAllFilters = (query: any) => {
    let q = query.eq("city", city);

    if (searchName) q = q.ilike("name", `%${searchName}%`);

    if (busyCleanerIds.length > 0) {
      q = q.not("id", "in", `(${busyCleanerIds.join(",")})`);
    }

    if (filters.priceRange) {
      q = q
        .gte("hourly_rate", filters.priceRange[0])
        .lte("hourly_rate", filters.priceRange[1]);
    }

    if ((filters.minRating ?? 0) > 0) {
      const safeRating = Math.min(5, Number(filters.minRating));
      q = q.gte("average_rating", safeRating);
    }

    if ((filters.minJobs ?? 0) > 0) {
      q = q.gte("completed_jobs_count", Math.max(0, Number(filters.minJobs)));
    }

    if (filters.suppliesProvided === "true") {
      q = q.eq("supplies_provided", true);
    } else if (filters.suppliesProvided === "false") {
      q = q.eq("supplies_provided", false);
    }

    return q;
  };

  // Get the count using the helper
  const countQuery = supabase
    .from("cleaners")
    .select("*", { count: "exact", head: true });

  const { count: totalCount } = await applyAllFilters(countQuery);

  if (!totalCount || totalCount === 0) {
    return { cleaners: [], count: 0 };
  }

  // Get the data using the same helper
  let dataQuery = supabase.from("cleaners").select("*");
  dataQuery = applyAllFilters(dataQuery);

  // Handle Sorting
  switch (sortBy) {
    case "lowest_price":
      dataQuery = dataQuery.order("hourly_rate", { ascending: true });
      break;
    case "experience":
      dataQuery = dataQuery.order("completed_jobs_count", { ascending: false });
      break;
    case "highest_price":
      dataQuery = dataQuery.order("hourly_rate", { ascending: false });
      break;
    default:
      dataQuery = dataQuery.order("average_rating", { ascending: false });
      break;
  }

  // Apply Range and Execute
  const { data: cleaners, error } = await dataQuery.range(
    startingRange,
    endingRange,
  );

  if (error) {
    console.error("Supabase Error:", error);
    return { cleaners: [], count: totalCount };
  }

  return { cleaners: cleaners ?? [], count: totalCount };
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
          *,
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

export const getCleanerDaysOff = cache(async (id: string) => {
  if (!z.uuid().safeParse(id).success) return { data: [] };

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("unavailability")
    .select("off_date")
    .eq("cleaner_id", id);

  if (error) {
    console.error("Supabase error:", error);
    return { data: [] };
  }

  // Return the raw strings ["2026-02-20", "2026-02-21"]
  const cleanedUpData = data.map((dates) => dates.off_date);

  return { data: cleanedUpData };
});
