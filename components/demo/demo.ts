import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export async function loginDemoCustomer(router: ReturnType<typeof useRouter>) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: process.env.NEXT_PUBLIC_DEMO_CUSTOMER_EMAIL!,
    password: process.env.NEXT_PUBLIC_DEMO_CUSTOMER_PASSWORD!,
  });

  if (error) {
    toast.error(error.message);
    console.error(error);
  } else {
    router.push("/customer");
  }
}

export async function loginDemoCleaner(router: ReturnType<typeof useRouter>) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: process.env.NEXT_PUBLIC_DEMO_CLEANER_EMAIL!,
    password: process.env.NEXT_PUBLIC_DEMO_CLEANER_PASSWORD!,
  });

  if (error) {
    toast.error(error.message);
    console.error(error);
  } else {
    router.push("/cleaner");
  }
}
