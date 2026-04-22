"use server";

import {
  endOfDay,
  endOfMonth,
  format,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { APP_TIMEZONE } from "../constants/booking";
import { revalidatePath } from "next/cache";
import { getCurrentCleaner } from "../data/cleaners";
import { createClient } from "../supabase/server";

export async function getDayScheduleForCustomer(date: Date, cleanerId: string) {
  const supabase = await createClient();

  const start = fromZonedTime(startOfDay(date), APP_TIMEZONE).toISOString();
  const end = fromZonedTime(endOfDay(date), APP_TIMEZONE).toISOString();

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

  const start = fromZonedTime(startOfDay(date), APP_TIMEZONE).toISOString();
  const end = fromZonedTime(endOfDay(date), APP_TIMEZONE).toISOString();

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("cleaner_id", cleaner.id)
    .gte("scheduled_at", start)
    .lte("scheduled_at", end)
    .order("scheduled_at");

  if (error) throw new Error(error.message);

  return data ?? [];
}

export async function getMonthDaysOffForCleaner(month: Date) {
  const cleaner = await getCurrentCleaner();
  const supabase = await createClient();

  const start = format(startOfMonth(month), "yyyy-MM-dd");
  const end = format(endOfMonth(month), "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("unavailability")
    .select("off_date")
    .eq("cleaner_id", cleaner.id)
    .gte("off_date", start)
    .lte("off_date", end);

  if (error) throw new Error(error.message);

  const refinedData = data.map((d) => new Date(d.off_date));

  return refinedData;
}

export async function addDayOff(date: Date) {
  const cleaner = await getCurrentCleaner();
  const supabase = await createClient();

  const offDate = formatInTimeZone(date, APP_TIMEZONE, "yyyy-MM-dd");

  const { error } = await supabase
    .from("unavailability")
    .insert({ cleaner_id: cleaner.id, off_date: offDate });

  if (error) throw new Error(error.message);
  revalidatePath("/cleaner");
}

export async function removeDayOff(date: Date) {
  const cleaner = await getCurrentCleaner();
  const supabase = await createClient();

  const offDate = formatInTimeZone(date, APP_TIMEZONE, "yyyy-MM-dd");

  const { error } = await supabase
    .from("unavailability")
    .delete()
    .eq("cleaner_id", cleaner.id)
    .eq("off_date", offDate);

  if (error) throw new Error(error.message);
}
