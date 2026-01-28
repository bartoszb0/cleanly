import { Skeleton } from "@/components/ui/skeleton";

export default function CleanerInfoSkeleton() {
  return (
    <div>
      {/* Header Card Skeleton */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar Skeleton */}
          <div className="flex-shrink-0">
            <Skeleton className="w-32 h-32 rounded-2xl bg-slate-700/50" />
          </div>

          {/* Name and Location Skeleton */}
          <div className="flex-1 space-y-4 w-full">
            <Skeleton className="h-10 w-3/4 bg-slate-700/50" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full bg-slate-700/50" />
              <Skeleton className="h-6 w-1/3 bg-slate-700/50" />
            </div>
            {/* Price Tag Skeleton */}
            <Skeleton className="h-12 w-40 rounded-lg bg-slate-700/50" />
          </div>
        </div>
      </div>

      {/* Quick Info Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg bg-slate-700/50" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-1/2 bg-slate-700/50" />
                <Skeleton className="h-5 w-3/4 bg-slate-700/50" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bio Section Skeleton */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 mb-6">
        <Skeleton className="h-8 w-32 mb-4 bg-slate-700/50" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full bg-slate-700/50" />
          <Skeleton className="h-4 w-[95%] bg-slate-700/50" />
          <Skeleton className="h-4 w-[90%] bg-slate-700/50" />
        </div>
      </div>

      {/* Contact Section Skeleton */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
        <Skeleton className="h-8 w-48 mb-4 bg-slate-700/50" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-lg bg-slate-700/50" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-3 w-24 bg-slate-700/50" />
            <Skeleton className="h-6 w-40 bg-slate-700/50" />
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Skeleton className="flex-1 h-14 rounded-xl bg-slate-700/50" />
        <Skeleton className="flex-1 h-14 rounded-xl bg-slate-700/50" />
      </div>
    </div>
  );
}
