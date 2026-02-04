import { Skeleton } from "@/components/ui/skeleton";

function CleanerCardSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Skeleton className="w-20 h-20 rounded-full bg-slate-700/50" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <Skeleton className="h-6 w-3/4 mb-2 bg-slate-700/50" />
            <Skeleton className="h-4 w-1/4 bg-slate-700/50" />
          </div>

          <div className="space-y-2 mb-4">
            <Skeleton className="h-3 w-full bg-slate-700/50" />
            <Skeleton className="h-3 w-5/6 bg-slate-700/50" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <Skeleton className="h-4 w-full bg-slate-700/50" />
            <Skeleton className="h-4 w-full bg-slate-700/50" />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
            <Skeleton className="h-8 w-24 bg-slate-700/50" />
            <Skeleton className="h-9 w-28 rounded-lg bg-slate-700/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CleanersListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6 p-4 w-full">
      {[...Array(6)].map((_, i) => (
        <CleanerCardSkeleton key={i} />
      ))}
    </div>
  );
}
