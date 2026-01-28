import CleanersListSkeleton from "@/components/cleaner/cleaner-list-skeleton";
import { Button } from "@/components/ui/button";

export default function Loading() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="h-10 w-64 bg-slate-700/50 animate-pulse mt-10 rounded-lg"></div>

      <div className="flex flex-row gap-4 mt-5">
        <Button disabled className="opacity-50">
          Input - Search by name
        </Button>
        <Button disabled className="opacity-50">
          Sort
        </Button>
        <Button disabled className="opacity-50">
          Filter
        </Button>
      </div>

      <CleanersListSkeleton />
    </div>
  );
}
