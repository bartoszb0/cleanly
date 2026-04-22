"use server";

import { endOfDay, startOfDay } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { revalidatePath } from "next/cache";
import { APP_TIMEZONE } from "../constants/booking";
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

export async function getMonthDaysOffForCleaner(year: number, month: number) {
  const cleaner = await getCurrentCleaner();
  const supabase = await createClient();

  const mm = String(month).padStart(2, "0");
  const lastDay = new Date(year, month, 0).getDate();
  const start = `${year}-${mm}-01`;
  const end = `${year}-${mm}-${lastDay}`;

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
