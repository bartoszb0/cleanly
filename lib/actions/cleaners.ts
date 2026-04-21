"use server";

import { OpinionSortOption } from "@/types";
import { revalidatePath } from "next/cache";
import {
  CLEANER_OPINIONS_PER_PAGE,
  CUSTOMER_OPINIONS_PER_PAGE,
} from "../constants/opinions";
import {
  getCleanerOpinionsForCustomer,
  getCleanersOpinions,
  getCurrentCleaner,
} from "../data/cleaners";
import { CleanerFormValues } from "../schemas/cleanerForm";
import { createClient } from "../supabase/server";

export async function updateCleanerProfile(values: CleanerFormValues) {
  const supabase = await createClient();
  const cleaner = await getCurrentCleaner();

  const { error } = await supabase
    .from("cleaners")
    .update({
      name: values.name,
      bio: values.bio,
      hourly_rate: values.hourly_rate as number,
      city: values.city,
      phone: values.phone,
      supplies_provided: values.supplies_provided,
    })
    .eq("id", cleaner.id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/cleaner/profile");
  revalidatePath("/cleaner");
  return { success: true };
}

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
