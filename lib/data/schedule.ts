import { endOfDay, startOfDay } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { createClient } from "../supabase/client";

export async function fetchDaySchedule(date: Date, cleanerId: string) {
  const start = fromZonedTime(startOfDay(date), "Europe/Warsaw").toISOString();
  const end = fromZonedTime(endOfDay(date), "Europe/Warsaw").toISOString();

  const supabase = createClient(); // Client call

  const { data, error } = await supabase
    .from("jobs")
    .select("scheduled_at, end_time, status")
    .eq("cleaner_id", cleanerId)
    .neq("status", "cancelled")
    .gte("scheduled_at", start)
    .lte("scheduled_at", end)
    .order("scheduled_at");

  if (error) throw new Error(error.message);

  return data || [];
}
