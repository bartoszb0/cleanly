"use server";

import { createClient } from "@/lib/supabase/server";

export async function loginDemoCustomer() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: process.env.DEMO_CUSTOMER_EMAIL!,
    password: process.env.DEMO_CUSTOMER_PASSWORD!,
  });

  if (error) return { success: false, message: error.message };
  return { success: true };
}

export async function loginDemoCleaner() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: process.env.DEMO_CLEANER_EMAIL!,
    password: process.env.DEMO_CLEANER_PASSWORD!,
  });

  if (error) return { success: false, message: error.message };
  return { success: true };
}
