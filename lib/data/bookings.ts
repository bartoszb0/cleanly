import { endOfDay, startOfDay } from "date-fns";
import { cache } from "react";
import { createClient } from "../supabase/server";
import { getCurrentCleaner } from "./cleaners";
import { getCurrentCustomer } from "./customer";

export const getBookingsForCustomer = cache(async () => {
  const supabase = await createClient();
  const customer = await getCurrentCustomer();

  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
        *,
        cleaner:cleaner_id (
          name,
          avatar_url
        ),
        review:opinions (id)
      `,
    )
    .eq("customer_id", customer.id)
    .order("scheduled_at", { ascending: false });

  if (error) throw new Error(error.message);

  return { data };
});

export const getTodaysBookings = async (cleanerId: string) => {
  const supabase = await createClient();
  const today = new Date();
  const start = startOfDay(today).toISOString();
  const end = endOfDay(today).toISOString();

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("cleaner_id", cleanerId)
    .in("status", ["confirmed", "completed", "cancelled"])
    .gte("scheduled_at", start)
    .lte("scheduled_at", end)
    .order("scheduled_at");

  if (error) throw new Error(error.message);

  return data;
};

export const getJobDetails = async (jobId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select("*, customers(full_name, phone)")
    .eq("id", jobId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getJobsForCleaner = async (offset = 0, limit = 10) => {
  const supabase = await createClient();
  const cleaner = await getCurrentCleaner();

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("cleaner_id", cleaner.id)
    .order("scheduled_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw new Error(error.message);

  return data;
};
