"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <Button
      onClick={logout}
      className="text-center w-full bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
    >
      Logout
    </Button>
  );
}
