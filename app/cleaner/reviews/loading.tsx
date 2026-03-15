import ReviewsHeader from "@/components/cleaner-dashboard/reviews/header";
import { RatingSummarySkeleton } from "@/components/cleaner-dashboard/reviews/summary-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsPageLoading() {
  return (
    <div>
      {/* Page header */}
      <ReviewsHeader />

      {/* Summary */}
      <RatingSummarySkeleton />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-8 w-12 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-8 w-45 rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center gap-4 pt-2 border-t border-border">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
