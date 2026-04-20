import { BOOKING_STATUS_CONFIG } from "@/lib/constants/status-config";
import { Tables } from "@/types/supabase";
import { format } from "date-fns";

export default function JobHeader({
  job,
  scheduledDate,
}: {
  job: Tables<"jobs">;
  scheduledDate: Date;
}) {
  const status = BOOKING_STATUS_CONFIG[job.status];

  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <div
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border mb-3 ${status.className}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          {format(scheduledDate, "EEEE, MMMM do")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {format(scheduledDate, "yyyy")} · Job #{job.id.slice(0, 8)}
        </p>
      </div>

      {/* Earnings */}
      <div className="text-center bg-primary/10 border border-primary/20 rounded-xl px-5 py-3 shrink-0">
        <div className="text-2xl font-bold text-primary leading-none">
          {job.total_price}
        </div>
        <div className="text-xs text-primary/60 mt-1 tracking-widest">PLN</div>
      </div>
    </div>
  );
}
