import { redirect } from "next/navigation";
import { cache } from "react";
import { createClient } from "../supabase/server";
import { getRequiredUser } from "./auth";

export const getCurrentCustomer = cache(async () => {
  const supabase = await createClient();
  const user = await getRequiredUser();

  const { data: profile, error } = await supabase
    .from("customers")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    redirect("/onboarding");
  }

  return profile;
});
