"use client";

import { addDayOff } from "@/lib/actions/schedule";
import { CalendarOff, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DayOffBtn({ date, onSuccess = () => {} }: { date: Date; onSuccess?: () => void }) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      try {
        await addDayOff(date);
        onSuccess();
        toast.success("Day marked as off");
      } catch {
        toast.error("Failed to mark day off");
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 px-3 py-1.5 rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <CalendarOff size={12} />
      )}
      Mark day off
    </button>
  );
}
