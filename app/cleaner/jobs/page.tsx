import JobCard from "@/components/cleaner-dashboard/jobs/job/job-card";
import { getJobsForCleaner } from "@/lib/data/bookings";
import { Tables } from "@/types/supabase";
import { format } from "date-fns";
import { Briefcase, Wallet } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-card border border-border rounded-2xl p-16 flex flex-col items-center gap-3 text-center">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
        <Briefcase size={24} className="text-primary" />
      </div>
      <p className="text-sm font-semibold text-foreground">No jobs yet</p>
      <p className="text-xs text-muted-foreground max-w-xs">
        Your jobs will appear here once customers start booking you.
      </p>
    </div>
  );
}

function groupJobsByMonth(jobs: Tables<"jobs">[]) {
  return jobs.reduce(
    (acc, job) => {
      const key = format(new Date(job.scheduled_at), "MMMM yyyy");
      if (!acc[key]) acc[key] = [];
      acc[key].push(job);
      return acc;
    },
    {} as Record<string, typeof jobs>,
  );
}

export default async function CleanerJobs() {
  const jobs = await getJobsForCleaner();

  const totalEarnings = jobs
    .filter((j) => j.status === "completed")
    .reduce((sum, j) => sum + (j.total_price ?? j.price_snapshot), 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
            <Briefcase className="text-primary" size={22} />
            My Jobs
          </h1>
          <p className="text-sm text-muted-foreground">
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} total
          </p>
        </div>

        {/* Summary pills */}
        {jobs.length > 0 && (
          <div className="flex items-center gap-3 justify-end">
            <div className="flex items-center gap-1.5 text-xs font-medium text-foreground bg-muted px-3 py-1.5 rounded-full border border-border">
              <Wallet size={12} />
              {totalEarnings} PLN earned
            </div>
          </div>
        )}
      </div>

      {jobs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-8">
          {Object.entries(groupJobsByMonth(jobs)).map(([month, monthJobs]) => (
            <div key={month}>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                {month}
              </h2>
              <div className="flex flex-col gap-3">
                {monthJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
