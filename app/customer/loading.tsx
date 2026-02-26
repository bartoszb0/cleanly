import CleanersListSkeleton from "@/components/cleaner/cleaner-list-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <div className="p-4">
        <Skeleton className="h-10 w-72 mt-10 mx-auto" />
        <div className="mt-4 flex flex-row items-center gap-2">
          <Skeleton className="h-12 w-70 md:w-105 lg:w-140" />
          <Skeleton className="h-12 w-12" />
        </div>
      </div>
      <CleanersListSkeleton />
    </div>
  );
}
