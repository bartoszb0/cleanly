import DashboardHeader from "@/components/cleaner-dashboard/dashboard/dashboard-header";
import TodaysJobsSkeleton from "@/components/cleaner-dashboard/dashboard/todays-jobs-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

function CleanerStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden"
        >
          <Skeleton className="h-3 w-28 mb-3" />
          <Skeleton className="h-10 w-16" />
          <div className="absolute top-4 right-4">
            <Skeleton className="h-5 w-5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CleanerDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {[1, 2].map((card) => (
        <div
          key={card}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <Skeleton className="h-3 w-16 mb-5" />
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((row, i) => (
              <div
                key={row}
                className={`flex items-center justify-between ${i < 2 ? "pb-4 border-b border-border" : ""}`}
              >
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LoadingDashboard() {
  return (
    <div className="max-w-2xl mx-auto">
      <DashboardHeader>
        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-md">
          <Loader2 className="animate-spin" />
        </div>
      </DashboardHeader>
      <TodaysJobsSkeleton />
      <CleanerStatsSkeleton />
      <CleanerDetailsSkeleton />
    </div>
  );
}
