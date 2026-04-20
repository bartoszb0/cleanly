import { BOOKING_STATUS_CONFIG } from "@/lib/constants/status-config";
import { Tables } from "@/types/supabase";
import { format } from "date-fns";
import { ChevronRight, Clock, MapPin, Wallet } from "lucide-react";
import Link from "next/link";

export default function JobCard({ job }: { job: Tables<"jobs"> }) {
  const status = BOOKING_STATUS_CONFIG[job.status];
  const earnings = job.total_price ?? job.price_snapshot;
  const scheduledDate = new Date(job.scheduled_at);

  return (
    <Link
      href={`/cleaner/jobs/${job.id}`}
      className="group flex items-center gap-4 bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all duration-200"
    >
      {/* Date block */}
      <div className="shrink-0 w-14 text-center bg-muted rounded-xl py-2.5 px-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {format(scheduledDate, "MMM")}
        </p>
        <p className="text-2xl font-bold text-foreground leading-none mt-0.5">
          {format(scheduledDate, "d")}
        </p>
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${status.className}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {format(scheduledDate, "HH:mm")} · {job.duration_hours}h
          </span>
          <span className="flex items-center gap-1 truncate">
            <MapPin size={11} />
            {job.address},{" "}
            {job.city.charAt(0).toUpperCase() + job.city.slice(1)}
          </span>
        </div>
      </div>

      {/* Earnings */}
      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-primary flex items-center gap-1 justify-end">
          <Wallet size={13} />
          {earnings} PLN
        </p>
      </div>

      <ChevronRight
        size={16}
        className="shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
      />
    </Link>
  );
}
