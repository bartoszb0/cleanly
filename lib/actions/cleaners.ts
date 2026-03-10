"use server";

import { OpinionSortOption } from "@/types";
import { getCleanerOpinionsForCustomer } from "../data/cleaners";

export async function fetchMoreCleanerOpinions(
  id: string,
  opinionsLength: number,
  sortBy: OpinionSortOption = "newest",
) {
  const result = await getCleanerOpinionsForCustomer(
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
