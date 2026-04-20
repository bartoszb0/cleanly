import { Tables } from "@/types/supabase";
import { format } from "date-fns";
import { Calendar, Clock, Hash, Wallet } from "lucide-react";
import InfoRow from "./info-row";

export default function JobInformations({
  job,
  scheduledDate,
}: {
  job: Tables<"jobs">;
  scheduledDate: Date;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-4">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
        Job Details
      </h2>
      <InfoRow
        icon={Calendar}
        label="Scheduled"
        value={format(scheduledDate, "PPP")}
      />
      <InfoRow
        icon={Clock}
        label="Duration"
        value={`${job.duration_hours} hour${job.duration_hours !== 1 ? "s" : ""}`}
      />
      <InfoRow
        icon={Wallet}
        label="Hourly rate"
        value={`${job.price_snapshot} PLN`}
      />
      {job.total_price && (
        <InfoRow
          icon={Wallet}
          label="Final price"
          value={`${job.total_price} PLN`}
          highlight
        />
      )}
      <InfoRow icon={Hash} label="Job ID" value={job.id.slice(0, 8) + "…"} />
    </div>
  );
}
