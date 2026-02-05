import CleanersListSkeleton from "@/components/cleaner/cleaner-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Title Skeleton */}
      <Skeleton className="h-10 w-72 mt-10" />

      {/* FilterControls Skeleton */}
      <div className="mt-4 flex flex-row items-center gap-2">
        {/* Match the Search Input width/height */}
        <Skeleton className="h-12 w-[300px] md:w-[400px]" />
        {/* Match the Filter Toggle Button */}
        <Skeleton className="h-12 w-12" />
      </div>

      {/* List Content */}
      <CleanersListSkeleton />
    </div>
  );
}
