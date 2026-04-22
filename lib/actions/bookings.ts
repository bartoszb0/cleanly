"use server";

import { JobInsert } from "@/types";
import { TablesInsert } from "@/types/supabase";
import { addHours } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentCustomer } from "../data/customer";
import { bookingSchema, BookingValues } from "../schemas/bookCleaner";
import { createClient } from "../supabase/server";
import { getOrCreateConversation, saveMessage } from "./conversations";

export async function cancelBooking(jobId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("jobs")
    .update({ status: "cancelled" })
    .eq("id", jobId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/customer/my-bookings");
  return { success: true };
}

export async function confirmJob(jobId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("jobs")
    .update({ status: "confirmed" })
    .eq("id", jobId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/cleaner/jobs");
  revalidatePath(`/cleaner/jobs/${jobId}`);
  return { success: true };
}

export async function cancelJobByCleaner(jobId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("jobs")
    .update({ status: "cancelled" })
    .eq("id", jobId);

  if (error) return { success: false, error: error.message };

  revalidatePath("/cleaner/jobs");
  revalidatePath(`/cleaner/jobs/${jobId}`);
  return { success: true };
}

export async function createBookingRequest(
  bookingData: BookingValues,
  cleanerId: string,
) {
  const validatedFields = bookingSchema.safeParse(bookingData);

  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      success: false,
      error: "Invalid form data",
    };
  }

  const supabase = await createClient();
  const user = await getCurrentCustomer();

  const { date, startHour, startMinute, duration } = validatedFields.data;

  const localDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Number(startHour),
    Number(startMinute),
  );

  const scheduled_at = fromZonedTime(localDate, "Europe/Warsaw"); // correctly converts to UTC
  const end_time = addHours(scheduled_at, Number(duration));

  // Run the conflict check
  const { data: conflict } = await supabase
    .from("jobs")
    .select("id")
    .eq("cleaner_id", cleanerId)
    .eq("status", "confirmed")
    .lt("scheduled_at", end_time.toISOString())
    .gt("end_time", scheduled_at.toISOString())
    .limit(1);

  if (conflict && conflict.length > 0)
    return { success: false, error: "Slot already taken" };

  // Insert data if there is no conflict
  const jobData: JobInsert = {
    customer_id: user.id,
    cleaner_id: cleanerId,
    scheduled_at: scheduled_at.toISOString(),
    duration_hours: Number(validatedFields.data.duration),
    end_time: end_time.toISOString(),
    status: "pending",
  };

  // address, city, post_code, price_snapshot are filled by a DB trigger
  const { data: booking, error } = await supabase
    .from("jobs")
    .insert(jobData as TablesInsert<"jobs">)
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };

  // Get conversationId, or create a new one
  const conversationData = await getOrCreateConversation(cleanerId);

  if (!conversationData.success)
    return {
      success: false,
      error: conversationData.error ?? "Could not start a conversation",
    };

  // Here now send the message with bookingId
  await saveMessage(conversationData.success, "booking_request", booking.id);

  redirect(`/customer/messages/${conversationData.success}`);
}
