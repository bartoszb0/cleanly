"use server";

import { addHours } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { revalidatePath } from "next/cache";
import { getCurrentCustomer } from "../data/customer";
import { bookingSchema, BookingValues } from "../schemas/bookCleaner";
import { createClient } from "../supabase/server";

export async function cancelBooking(jobId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("jobs")
    .update({ status: "cancelled" })
    .eq("id", jobId);

  if (error) {
    console.log(error);
    return { success: false, error: error.message };
  }

  revalidatePath("/customer/my-bookings");
  return { success: true };
}

export async function createBookingRequest(
  bookingData: BookingValues,
  cleanerId: string,
) {
  const validatedFields = bookingSchema.safeParse(bookingData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid form data",
    };
  }

  const supabase = await createClient();
  const user = await getCurrentCustomer();

  const { date, startHour, startMinute, duration } = validatedFields.data;

  ////////

  // Replace your manual string building with this:
  const localDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Number(startHour),
    Number(startMinute),
  );

  const scheduled_at = fromZonedTime(localDate, "Europe/Warsaw"); // correctly converts to UTC
  const end_time = addHours(scheduled_at, Number(duration));

  // 4. Run the conflict check
  const { data: conflict } = await supabase
    .from("jobs")
    .select("id")
    .eq("cleaner_id", cleanerId)
    .neq("status", "cancelled")
    .lt("scheduled_at", end_time.toISOString())
    .gt("end_time", scheduled_at.toISOString())
    .limit(1);

  if (conflict && conflict.length > 0)
    return { success: false, error: "Slot already taken" };

  /////////

  // Insert data if there is no conflict

  // Typescript Error on insert happens because there is a trigger that automatically pulls the
  // addres and city from customers profile based on his ID, probably should just ignore it
  const { error } = await supabase.from("jobs").insert({
    customer_id: user.id,
    cleaner_id: cleanerId,
    scheduled_at: scheduled_at.toISOString(),
    duration_hours: Number(validatedFields.data.duration),
    end_time: end_time.toISOString(),
    status: "pending",
  });

  if (error) return { success: false, error: error.message };

  return { success: true };
}
