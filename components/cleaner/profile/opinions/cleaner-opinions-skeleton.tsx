import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function CleanerOpinionsSkeleton() {
  return (
    <div className="mt-14">
      <h1 className="text-3xl font-bold">Opinions</h1>
      <div className="flex gap-2 mt-4">
        <Button disabled>Sort</Button>
        <Button disabled>Filter</Button>
      </div>

      {/* Render 3 opinion skeletons */}
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="my-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
        >
          {/* Star rating skeleton */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-6 h-6 rounded-full" />
            ))}
          </div>

          {/* Customer name skeleton */}
          <Skeleton className="mt-2 h-5 w-32" />

          {/* Opinion content skeleton */}
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Bottom section with buttons and date */}
          <div className="flex justify-between mt-5">
            <div className="flex gap-2">
              <Skeleton className="w-10 h-10 rounded-md" />
              <Skeleton className="w-10 h-10 rounded-md" />
            </div>
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
