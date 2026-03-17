"use server";

import { endOfDay, startOfDay } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { getCurrentCleaner } from "../data/cleaners";
import { createClient } from "../supabase/server";

export async function getDayScheduleForCustomer(date: Date, cleanerId: string) {
  const supabase = await createClient();

  const start = fromZonedTime(startOfDay(date), "Europe/Warsaw").toISOString();
  const end = fromZonedTime(endOfDay(date), "Europe/Warsaw").toISOString();

  const { data, error } = await supabase
    .from("jobs")
    .select("scheduled_at, end_time, status")
    .eq("cleaner_id", cleanerId)
    .not("status", "in", '("cancelled","pending")')
    .gte("scheduled_at", start)
    .lte("scheduled_at", end)
    .order("scheduled_at");

  if (error) throw new Error(error.message);

  return data || [];
}

export async function getDayScheduleForCleaner(date: Date) {
  const cleaner = await getCurrentCleaner();
  const supabase = await createClient();

  const start = fromZonedTime(startOfDay(date), "Europe/Warsaw").toISOString();
  const end = fromZonedTime(endOfDay(date), "Europe/Warsaw").toISOString();

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("cleaner_id", cleaner.id)
    .gte("scheduled_at", start)
    .lte("scheduled_at", end);

  if (error) throw new Error(error.message);

  return data ?? [];
}
