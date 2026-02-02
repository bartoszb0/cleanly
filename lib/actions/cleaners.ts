"use server";

import { OpinionSortOption } from "@/types";
import { getCleanerOpinions } from "../data/cleaners";

export async function fetchMoreCleanerOpinions(
  id: string,
  opinionsLength: number,
  sortBy: OpinionSortOption = "newest",
) {
  const result = await getCleanerOpinions(
    id,
    opinionsLength,
    opinionsLength + 4,
    sortBy,
  );

  if (!result) return { success: false, data: [] };

  return {
    success: true,
    data: result.opinions,
    total: result.count,
  };
}
