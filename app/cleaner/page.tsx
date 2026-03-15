import CleanerDetails from "@/components/cleaner-dashboard/dashboard/cleaner-details";
import CleanerStats from "@/components/cleaner-dashboard/dashboard/cleaner-stats";
import TodaysJobs from "@/components/cleaner-dashboard/dashboard/todays-jobs";
import { getCurrentCleaner } from "@/lib/data/cleaners";
import { getInitials } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default async function CleanerDashboard() {
  const cleaner = await getCurrentCleaner();

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-9">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Welcome back, {cleaner.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse your jobs and informations
          </p>
        </div>
        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-md">
          {getInitials(cleaner.name)}
        </div>
      </div>

      {/* Today cleanings */}
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <TodaysJobs cleanerId={cleaner.id} />
      </Suspense>

      {/* Stats */}
      <CleanerStats cleaner={cleaner} />

      {/* Details row */}
      <CleanerDetails cleaner={cleaner} />
    </div>
  );
}
