import { format } from "date-fns";
import { Timer } from "lucide-react";

export default function JobTimeline({
  jobDurationHours,
  scheduledDate,
  endTime,
}: {
  jobDurationHours: number;
  scheduledDate: Date;
  endTime: Date;
}) {
  return (
    <div className="flex items-center gap-4 bg-muted/50 rounded-xl px-5 py-4">
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-1">Start</p>
        <p className="text-xl font-bold text-foreground tabular-nums">
          {format(scheduledDate, "HH:mm")}
        </p>
      </div>
      <div className="flex-1 flex items-center gap-2">
        <div className="flex-1 h-px bg-border" />
        <div className="flex items-center gap-1 text-lg text-muted-foreground bg-card border border-border px-2.5 py-1 rounded-full">
          <Timer size={20} />
          {jobDurationHours}h
        </div>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-1">End</p>
        <p className="text-xl font-bold text-foreground tabular-nums">
          {format(endTime, "HH:mm")}
        </p>
      </div>
    </div>
  );
}
