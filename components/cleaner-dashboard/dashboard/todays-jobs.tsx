import { JOB_STATUS_CONFIG } from "@/lib/constants/job";
import { getDisplayStatus } from "@/lib/utils";
import { Tables } from "@/types/supabase";
import { format } from "date-fns";
import {
  CalendarOff,
  ChevronRight,
  Clock,
  MapPin,
  Sun,
  Wallet,
} from "lucide-react";

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-10 gap-3 text-center">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <Sun size={22} className="text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">No jobs today</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Enjoy your day off
        </p>
      </div>
    </div>
  );
}

function JobCard({ job }: { job: Tables<"jobs"> }) {
  const displayStatus = getDisplayStatus(job);

  const status =
    JOB_STATUS_CONFIG[displayStatus as keyof typeof JOB_STATUS_CONFIG];

  const time = format(new Date(job.scheduled_at), "HH:mm");

  return (
    <div
      className={`
      relative shrink-0 w-64 bg-card border rounded-2xl p-5 
      flex flex-col gap-3 cursor-pointer group
      hover:border-primary/30 transition-all duration-200
      ${job.status === "completed" ? "border-border opacity-40" : "border-border"}
    `}
    >
      {/* Status badge */}
      <div
        className={`self-start flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${status.classes}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
        {status.label}
      </div>

      {/* Time + duration */}
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-foreground tabular-nums">
          {time}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock size={12} />
          {job.duration_hours}h
        </span>
      </div>

      {/* Address */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin size={12} />
        {job.address}, {job.post_code}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
        <span className="text-sm font-bold text-primary flex items-center gap-1">
          <Wallet size={13} />
          {job.total_price ?? job.price_snapshot} PLN
        </span>
        <ChevronRight
          size={16}
          className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
        />
      </div>
    </div>
  );
}

export default function TodaysJobs({ jobs }: { jobs: Tables<"jobs">[] }) {
  const today = format(new Date(), "eeee, MMMM do, yyyy");

  const upcoming = jobs.filter(
    (j) => j.status === "confirmed" && new Date(j.scheduled_at) > new Date(),
  );
  const totalEarnings = jobs
    .filter((j) => j.status == "completed")
    .reduce((sum, j) => sum + (j.total_price ?? j.price_snapshot), 0);

  return (
    <div className="bg-card/40 border border-border rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Today's Jobs
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">{today}</p>
        </div>

        <div className="flex items-center gap-3">
          {jobs.length > 0 ? (
            <>
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                <Clock size={12} />
                {upcoming.length} upcoming
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-foreground bg-muted px-3 py-1.5 rounded-full">
                <Wallet size={12} />
                {totalEarnings} PLN
              </div>
            </>
          ) : (
            <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 px-3 py-1.5 rounded-full transition-colors cursor-pointer">
              <CalendarOff size={12} />
              Mark day off
            </button>
          )}
        </div>
      </div>

      {jobs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
