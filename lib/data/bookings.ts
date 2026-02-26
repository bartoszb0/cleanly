import { cache } from "react";
import { createClient } from "../supabase/server";

export const getBookingsForCustomer = cache(async (customerId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
        *,
        cleaner:cleaner_id (
          name,
          avatar_url
        ),
        review:opinions (id)
      `,
    )
    .eq("customer_id", customerId)
    .order("scheduled_at", { ascending: false });

  if (error) throw new Error(error.message);

  return { data };
});
