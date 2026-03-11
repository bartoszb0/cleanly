"use server";

import { OpinionSortOption } from "@/types";

import {
  CLEANER_OPINIONS_PER_PAGE,
  CUSTOMER_OPINIONS_PER_PAGE,
} from "../constants/opinions";
import {
  getCleanerOpinionsForCustomer,
  getCleanersOpinions,
} from "../data/cleaners";

export async function fetchMoreCleanerOpinionsForCustomer(
  id: string,
  opinionsLength: number,
  sortBy: OpinionSortOption = "newest",
) {
  const result = await getCleanerOpinionsForCustomer(
    id,
    opinionsLength,
    opinionsLength + CUSTOMER_OPINIONS_PER_PAGE - 1,
    sortBy,
  );

  if (!result) return { success: false, data: [] };

  return {
    success: true,
    data: result.opinions,
    total: result.count,
  };
}

export async function fetchMoreCleanerOpinions(
  opinionsLength: number,
  sortBy: OpinionSortOption = "newest",
  rating: number = 0,
) {
  const result = await getCleanersOpinions(
    opinionsLength,
    opinionsLength + CLEANER_OPINIONS_PER_PAGE - 1,
    sortBy,
    rating,
  );

  if (!result) return { success: false, data: [] };

  return {
    success: true,
    data: result.opinions,
    total: result.count,
  };
}
