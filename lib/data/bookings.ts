import { cache } from "react";
import { createClient } from "../supabase/server";
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
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("cleaner_id", cleanerId)
    .in("status", ["confirmed", "completed", "cancelled"])
    .gte("scheduled_at", startOfDay)
    .lte("scheduled_at", endOfDay)
    .order("scheduled_at");

  if (error) throw new Error(error.message);

  return data;
};
