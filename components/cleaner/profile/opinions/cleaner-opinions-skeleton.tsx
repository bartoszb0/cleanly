import { Skeleton } from "@/components/ui/skeleton";

export default function CleanerOpinionsSkeleton() {
  return (
    <div className="mt-14">
      {/* Header with title and rating skeleton */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Opinions</h1>

        {/* Average rating skeleton */}
        <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl px-6 py-4">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-8 w-12" />
          <div className="h-6 w-px bg-slate-700/50" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Sort dropdown skeleton */}
      <div className="flex gap-2 mt-4">
        <Skeleton className="w-[180px] h-12 rounded-md" />
      </div>

      {/* Opinion cards skeleton */}
      <div className="mt-8 space-y-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
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
            <div className="flex justify-between items-center mt-5">
              <div className="flex gap-2">
                <Skeleton className="w-10 h-10 rounded-md" />
                <Skeleton className="w-10 h-10 rounded-md" />
              </div>
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Show more button skeleton */}
      <div className="mt-10 flex justify-center">
        <Skeleton className="h-10 w-full sm:w-32 rounded-md" />
      </div>
    </div>
  );
}
