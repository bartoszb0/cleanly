import { cache } from "react";
import { createClient } from "../supabase/server";

export const getBookingsForCustomer = cache(async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
        *,
        cleaner:cleaner_id (
          name,
          avatar_url
        )
      `,
    )
    .eq("customer_id", id)
    .order("scheduled_at", { ascending: false });

  if (error) throw new Error(error.message);

  return { data };
});
