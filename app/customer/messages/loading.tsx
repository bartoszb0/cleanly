import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

function ConversationHeaderSkeleton() {
  return (
    <div className="px-5 py-4 bg-slate-900/60 border-b border-slate-800 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full shrink-0 bg-slate-700/50" />
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-28 bg-slate-700/50" />
          <Skeleton className="h-3 w-12 bg-slate-700/50" />
        </div>
      </div>
      <Skeleton className="h-9 w-9 rounded-md bg-slate-700/50" />
    </div>
  );
}

function ConversationBodySkeleton() {
  return (
    <div className="flex-1 w-full overflow-y-auto p-4 space-y-4">
      <div className="flex text-center justify-center mt-30">
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
}

function ConversationInputSkeleton() {
  return (
    <div className="flex w-full gap-2 border-t border-slate-800 p-4">
      <Skeleton className="h-9 w-full rounded-full bg-slate-700/50" />
    </div>
  );
}

export default function ConversationSkeleton() {
  return (
    <div className="flex flex-col h-full w-full bg-background">
      <ConversationHeaderSkeleton />
      <ConversationBodySkeleton />
      <ConversationInputSkeleton />
    </div>
  );
}
