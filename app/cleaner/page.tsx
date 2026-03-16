import CleanerDetails from "@/components/cleaner-dashboard/dashboard/cleaner-details";
import CleanerStats from "@/components/cleaner-dashboard/dashboard/cleaner-stats";
import DashboardHeader from "@/components/cleaner-dashboard/dashboard/dashboard-header";
import TodaysJobs from "@/components/cleaner-dashboard/dashboard/todays-jobs";
import TodaysJobsSkeleton from "@/components/cleaner-dashboard/dashboard/todays-jobs-skeleton";
import { getCurrentCleaner } from "@/lib/data/cleaners";
import { getInitials } from "@/lib/utils";
import { Suspense } from "react";

export default async function CleanerDashboard() {
  const cleaner = await getCurrentCleaner();

  return (
    <div>
      <DashboardHeader>
        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-md">
          {getInitials(cleaner.name)}
        </div>
      </DashboardHeader>

      <Suspense fallback={<TodaysJobsSkeleton />}>
        <TodaysJobs cleanerId={cleaner.id} />
      </Suspense>

      <CleanerStats cleaner={cleaner} />

      <CleanerDetails cleaner={cleaner} />
    </div>
  );
}
