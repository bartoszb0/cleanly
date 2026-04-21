"use server";

import { OpinionInsert, OpinionVoteType } from "@/types";
import { TablesInsert } from "@/types/supabase";
import { revalidatePath } from "next/cache";
import { getCurrentCustomer } from "../data/customer";
import { ReviewFormValues, ReviewSchema } from "../schemas/reviewForm";
import { createClient } from "../supabase/server";

export async function opinionVote(opinionId: string, type: OpinionVoteType) {
  const customer = await getCurrentCustomer();
  const supabase = await createClient();

  // Check if vote already exists
  const { data: existing } = await supabase
    .from("opinion_likes")
    .select("type")
    .eq("opinion_id", opinionId)
    .eq("customer_id", customer.id)
    .single();

  if (existing?.type === type) {
    const { error } = await supabase
      .from("opinion_likes")
      .delete()
      .match({ opinion_id: opinionId, customer_id: customer.id });

    if (error) return { success: false, error: error.message };
  } else {
    // If it's a new vote OR a change (like -> dislike), this handles it
    const { error } = await supabase.from("opinion_likes").upsert(
      {
        opinion_id: opinionId,
        customer_id: customer.id,
        type,
      },
      { onConflict: "opinion_id,customer_id" },
    );

    if (error) return { success: false, error: error.message };
  }

  return { success: true };
}

export async function createOpinion(jobId: string, formData: ReviewFormValues) {
  const validatedFields = ReviewSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid form data",
    };
  }

  const supabase = await createClient();

  // cleaner_id and customer_id are filled by a DB trigger
  const opinionData: OpinionInsert = {
    job_id: jobId,
    rating: validatedFields.data.rating,
    content: validatedFields.data.review,
  };

  const { error } = await supabase
    .from("opinions")
    .insert(opinionData as TablesInsert<"opinions">);

  if (error) return { success: false, error: error.message };

  revalidatePath("/customer/my-bookings");

  return { success: true };
}
