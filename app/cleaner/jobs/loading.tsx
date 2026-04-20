import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase } from "lucide-react";

function JobCardSkeleton() {
  return (
    <div className="flex items-center gap-4 bg-card border border-border rounded-2xl p-5">
      {/* Date block */}
      <div className="shrink-0 w-14 bg-muted rounded-xl py-2.5 px-2 flex flex-col items-center gap-1.5">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-7 w-6" />
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      {/* Earnings */}
      <div className="shrink-0 flex flex-col items-end gap-1.5">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-12" />
      </div>

      <Skeleton className="shrink-0 h-4 w-4 rounded" />
    </div>
  );
}

function MonthGroupSkeleton({ count }: { count: number }) {
  return (
    <div>
      <Skeleton className="h-3 w-24 mb-3" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function JobsLoading() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="text-primary" size={22} />
            My Jobs
          </h1>
          <Skeleton className="h-3.5 w-16" />
        </div>
        <Skeleton className="h-7 w-32 rounded-full" />
      </div>

      {/* Month groups */}
      <div className="flex flex-col gap-8">
        <MonthGroupSkeleton count={3} />
        <MonthGroupSkeleton count={2} />
      </div>
    </div>
  );
}
