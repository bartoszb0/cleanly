import { endOfDay, startOfDay } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { createClient } from "../supabase/server";
import { getCurrentCleaner } from "./cleaners";

export async function getScheduleForConflictCheck(date: string) {
  const supabase = await createClient();
  const cleaner = await getCurrentCleaner();

  const start = fromZonedTime(startOfDay(date), "Europe/Warsaw").toISOString();
  const end = fromZonedTime(endOfDay(date), "Europe/Warsaw").toISOString();

  const { data, error } = await supabase
    .from("jobs")
    .select("id, scheduled_at, end_time, status")
    .eq("cleaner_id", cleaner.id)
    .not("status", "in", '("cancelled","pending")')
    .gte("scheduled_at", start)
    .lte("scheduled_at", end)
    .order("scheduled_at");

  if (error) throw new Error(error.message);

  return data || [];
}
