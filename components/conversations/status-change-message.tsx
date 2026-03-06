import { STATUS_CONFIG } from "@/lib/constants/status-config";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types";
import { format } from "date-fns";

export default function StatusChangeMessage({
  metadata,
}: {
  metadata: ChatMessage["metadata"];
}) {
  if (!metadata) return null;

  return (
    <div className="flex justify-center my-3">
      <div className="flex items-center gap-2 text-xs bg-slate-800/60 border border-slate-700/50 px-3 py-1.5 rounded-full">
        <span className="text-slate-500">
          {metadata.scheduled_at
            ? format(new Date(metadata.scheduled_at), "MMM d, HH:mm")
            : ""}
        </span>
        <span className="text-slate-600">·</span>
        <span
          className={cn(
            "capitalize font-medium",
            STATUS_CONFIG[metadata.from as string].className
              .split(" ")
              .find((c) => c.startsWith("text-")),
          )}
        >
          {metadata.from}
        </span>
        <span className="text-slate-500">→</span>
        <span
          className={cn(
            "capitalize font-medium",
            STATUS_CONFIG[metadata.to as string].className
              .split(" ")
              .find((c) => c.startsWith("text-")),
          )}
        >
          {metadata.to}
        </span>
      </div>
    </div>
  );
}
