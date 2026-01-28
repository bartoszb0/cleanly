"use server";

import { CleanerFormValues, CleanerSchema } from "@/lib/schemas/cleanerForm";
import { CustomerFormValues, CustomerSchema } from "@/lib/schemas/customerForm";
import { createClient } from "@/lib/supabase/server";
import { getRequiredUser } from "../data/auth";

export async function assignRole(selectedRole: UserProfileRole) {
  if (selectedRole !== "cleaner" && selectedRole !== "customer")
    return { success: false, error: "Invalid role selected" };

  const user = await getRequiredUser();
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ role: selectedRole })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function finishCustomerOnboarding(userData: CustomerFormValues) {
  const validatedFields = CustomerSchema.safeParse(userData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid form data",
    };
  }

  const { data } = validatedFields;
  const user = await getRequiredUser();
  const supabase = await createClient();

  const { error: customerError } = await supabase.from("customers").insert({
    id: user.id,
    full_name: data.fullName,
    city: data.city,
    address: data.address,
    post_code: data.postCode,
    phone: data.phone,
    has_pets: data.hasPets,
  });

  if (customerError) {
    return { success: false, error: customerError.message };
  }

  const { error: onboardingError } = await supabase
    .from("profiles")
    .update({ onboarded: true })
    .eq("id", user.id);

  // Manual rollback in case user gets onboarding error
  if (onboardingError) {
    await supabase.from("customers").delete().eq("id", user.id);
    return { success: false, error: onboardingError.message };
  }

  return { success: true };
}

export async function finishCleanerOnboarding(userData: CleanerFormValues) {
  const validatedFields = CleanerSchema.safeParse(userData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid form data",
    };
  }

  const { data } = validatedFields;
  const user = await getRequiredUser();
  const supabase = await createClient();

  const { error: cleanerError } = await supabase.from("cleaners").insert({
    id: user.id,
    name: data.name,
    bio: data.bio,
    experience_years: data.experience,
    hourly_rate: data.hourly_rate,
    city: data.city,
    phone: data.phone,
    supplies_provided: data.supplies_provided,
  });

  if (cleanerError) {
    return { success: false, error: cleanerError.message };
  }

  const { error: onboardingError } = await supabase
    .from("profiles")
    .update({ onboarded: true })
    .eq("id", user.id);

  // Manual rollback in case user gets onboarding error
  if (onboardingError) {
    await supabase.from("cleaners").delete().eq("id", user.id);
    return { success: false, error: onboardingError.message };
  }

  return { success: true };
}
