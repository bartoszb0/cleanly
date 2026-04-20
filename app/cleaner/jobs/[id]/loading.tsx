import { Skeleton } from "@/components/ui/skeleton";

function InfoRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

export default function JobDetailsLoading() {
  return (
    <div>
      {/* Header card */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-4">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-xl px-5 py-3 shrink-0 flex flex-col items-center gap-2">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>

        {/* Time bar */}
        <div className="flex items-center gap-4 bg-muted/50 rounded-xl px-5 py-4">
          <div className="text-center flex flex-col items-center gap-1">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-7 w-14" />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <div className="flex-1 h-px bg-border" />
            <Skeleton className="h-8 w-16 rounded-full" />
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="text-center flex flex-col items-center gap-1">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-7 w-14" />
          </div>
        </div>
      </div>

      {/* Location + Customer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-card border border-border rounded-2xl p-6">
          <Skeleton className="h-3 w-20 mb-4" />
          <InfoRowSkeleton />
          <InfoRowSkeleton />
          <InfoRowSkeleton />
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <Skeleton className="h-3 w-20 mb-4" />
          <InfoRowSkeleton />
          <InfoRowSkeleton />
          <Skeleton className="h-9 w-full mt-3 rounded-lg" />
        </div>
      </div>

      {/* Job info */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-4">
        <Skeleton className="h-3 w-24 mb-4" />
        <InfoRowSkeleton />
        <InfoRowSkeleton />
        <InfoRowSkeleton />
        <InfoRowSkeleton />
        <InfoRowSkeleton />
      </div>
    </div>
  );
}
