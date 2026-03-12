import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export function RatingSummarySkeleton() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-6 flex flex-col sm:flex-row gap-6 sm:gap-10 items-center">
      {/* Score skeleton */}
      <div className="text-center w-24 shrink-0 flex flex-col items-center gap-2">
        <Skeleton className="h-12 w-16" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>

      {/* Distribution skeleton */}
      <div className="flex-1 w-full flex flex-col gap-2">
        {[5, 4, 3, 2, 1].map((r) => (
          <div key={r} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-4 text-right">
              {r}
            </span>
            <Star
              size={11}
              className="text-amber-400 fill-amber-400 shrink-0"
            />
            <Skeleton className="flex-1 h-1.5 rounded-full bg-amber-400" />
            <span className="text-xs text-muted-foreground w-4">—</span>
          </div>
        ))}
      </div>
    </div>
  );
}
