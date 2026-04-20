import { ScheduleSlot } from "@/types";
import { format } from "date-fns";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

type DayTimelineProps = {
  schedule: ScheduleSlot[];
  pendingJob?: {
    id: string;
    scheduled_at: string;
    end_time: string;
  };
  conflict?: boolean;
};

function formatTime(iso: string) {
  return format(new Date(iso), "HH:mm");
}

export default function DayTimeline({
  schedule,
  pendingJob,
  conflict,
}: DayTimelineProps) {
  const allSlots = [
    ...schedule.map((s) => ({ ...s, isPending: false })),
    ...(pendingJob
      ? [{ ...pendingJob, status: "pending", isPending: true }]
      : []),
  ].sort(
    (a, b) =>
      new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime(),
  );

  return (
    <div className="w-full">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        Schedule for that day
      </p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-13 top-0 bottom-0 w-px bg-border" />

        <div className="flex flex-col gap-3">
          {allSlots.map((slot) => {
            const isPending = slot.isPending;

            return (
              <div key={slot.id} className="flex items-center gap-4">
                {/* Time */}
                <div className="w-11 shrink-0 text-right">
                  <span className="text-xs font-mono text-muted-foreground">
                    {formatTime(slot.scheduled_at)}
                  </span>
                </div>

                {/* Dot */}
                <div className="relative z-10 mt-0.5 shrink-0">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      isPending && conflict
                        ? "bg-destructive border-destructive ring-2 ring-destructive/30 animate-pulse"
                        : isPending
                          ? "bg-amber-400 border-amber-400 ring-2 ring-amber-400/30 animate-pulse"
                          : "bg-primary border-primary"
                    }`}
                  />
                </div>

                {/* Card */}
                <Link
                  href={isPending ? "#" : `/cleaner/jobs/${slot.id}`}
                  className={`flex-1 rounded-xl px-3 py-2 text-xs  border border-transparent hover:border-primary ${
                    isPending && conflict
                      ? "bg-destructive/10 border-destructive/25 pointer-events-none"
                      : isPending
                        ? "bg-amber-500/10 border-amber-500/25 pointer-events-none"
                        : "bg-card border-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-semibold ${
                        isPending && conflict
                          ? "text-destructive"
                          : isPending
                            ? "text-amber-300"
                            : "text-foreground"
                      }`}
                    >
                      {formatTime(slot.scheduled_at)} –{" "}
                      {formatTime(slot.end_time)}
                    </span>
                  </div>
                  {isPending && (
                    <div
                      className={`mt-0.5 flex items-center gap-1 ${conflict ? "text-destructive/70" : "text-amber-400/70"}`}
                    >
                      {conflict && <AlertTriangle size={14} />}
                      <span>
                        {conflict ? "Overlaps with existing job" : "This job"}
                      </span>
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
