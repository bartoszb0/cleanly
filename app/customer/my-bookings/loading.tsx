import { Skeleton } from "@/components/ui/skeleton";

const BookingCardSkeleton = () => (
  <div className="relative bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
    {/* Accent line */}
    <div className="h-px bg-slate-800" />

    <div className="p-5">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-32 bg-slate-800" />
          <Skeleton className="h-3 w-44 bg-slate-800/70" />
        </div>
        <Skeleton className="h-6 w-28 rounded-full bg-slate-800" />
      </div>

      {/* Date / time / price row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
          <Skeleton className="h-3.5 w-24 bg-slate-800" />
          <Skeleton className="h-3.5 w-28 bg-slate-800" />
        </div>
        <Skeleton className="h-4 w-16 bg-slate-800 shrink-0" />
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-2 sm:justify-end">
        <Skeleton className="h-9 w-36 rounded-md bg-slate-800" />
        <Skeleton className="h-9 w-32 rounded-md bg-slate-800" />
      </div>
    </div>
  </div>
);

export default function Loading() {
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold mt-10 text-center">My Bookings</h1>
      </div>

      <div className="w-full mt-10 p-4 max-w-4xl mx-auto">
        {/* Tabs list */}
        <Skeleton className="h-10 w-full rounded-md bg-slate-900/50" />

        {/* Cards grid */}
        <div className="space-y-4 mt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
