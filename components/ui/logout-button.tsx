"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
    });
  }

  return (
    <Button onClick={handleLogout} disabled={isPending} className="w-full">
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
