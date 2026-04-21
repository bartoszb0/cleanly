"use client";

import { Button } from "@/components/ui/button";
import { getOrCreateConversation } from "@/lib/actions/conversations";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "sonner";

export default function OpenChat({ cleanerId }: { cleanerId: string }) {
  const router = useRouter();

  const handleContact = async () => {
    startTransition(async () => {
      const result = await getOrCreateConversation(cleanerId);

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        router.push(`/customer/messages/${result.success}`);
      }
    });
  };

  return (
    <Button
      className="w-full h-16 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl transition-colors duration-200 font-semibold text-lg border border-slate-600"
      onClick={handleContact}
    >
      Send Message
    </Button>
  );
}
