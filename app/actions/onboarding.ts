"use server";

import { createClient } from "@/lib/supabase/server";
import { getErrorMessage } from "@/lib/utils/getErrorMessage";
import { getRequiredUser } from "@/lib/utils/getRequiredUser";

export async function finishOnboarding(selectedRole: UserProfileRole) {
  if (selectedRole !== "cleaner" && selectedRole !== "customer")
    return { success: false, error: "Invalid role selected" };

  const user = await getRequiredUser();

  try {
    const supabase = await createClient();

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
