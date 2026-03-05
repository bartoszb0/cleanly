"use client";

import { Button } from "@/components/ui/button";
import { getOrCreateConversation } from "@/lib/actions/conversations";
import { Loader2, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function MessageCleanerButton({ cleanerId }: { cleanerId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const data = await getOrCreateConversation(cleanerId);
      if (data.conversationId) {
        router.push(`/customer/messages/${data.conversationId}`);
      }
    });
  };

  return (
    <Button
      variant="outline"
      className="sm:w-auto gap-1.5 h-9 text-xs font-medium border-slate-700 text-slate-300 hover:text-slate-100 hover:bg-slate-800 hover:border-slate-600 bg-transparent"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <MessageCircle className="w-3.5 h-3.5" />
      )}
      Message Cleaner
    </Button>
  );
}
