import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function TodaysJobsSkeleton() {
  return (
    <div className="bg-card/40 border border-border rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      <div
        className="flex items-center justify-center"
        style={{ height: "174px" }}
      >
        <Loader2 className="animate-spin text-primary" size={42} />
      </div>
    </div>
  );
}
