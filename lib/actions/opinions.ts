"use server";

import { OpinionVoteType } from "@/types";
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

  // Typescript Error on insert happens because there is a supabase trigger that
  // automatically pulls rest of data
  const { error } = await supabase.from("opinions").insert({
    job_id: jobId,
    rating: validatedFields.data.rating,
    content: validatedFields.data.review,
  } as any); // to prevent typescript error

  if (error) return { success: false, error: error.message };

  revalidatePath("/customer/my-bookings");

  return { success: true };
}
