"use server";

import { CustomerFormValues, CustomerSchema } from "@/lib/schemas/customerForm";
import { createClient } from "@/lib/supabase/server";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { getRequiredUser } from "@/lib/utils/getRequiredUser";

export async function assignRole(selectedRole: UserProfileRole) {
  if (selectedRole !== "cleaner" && selectedRole !== "customer")
    return { success: false, error: "Invalid role selected" };

  const user = await getRequiredUser();
  const supabase = await createClient();

  try {
    const { error } = await supabase
      .from("profiles")
      .update({ role: selectedRole })
      .eq("id", user.id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
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

  try {
    const { error: customerError } = await supabase.from("customers").insert({
      id: user.id,
      full_name: data.fullName,
      city: data.city,
      address: data.address,
      post_code: data.postCode,
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
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
