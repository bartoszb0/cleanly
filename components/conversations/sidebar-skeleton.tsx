import { Skeleton } from "@/components/ui/skeleton";

function ConversationItemSkeleton() {
  return (
    <div className="flex items-center gap-3 p-2">
      <Skeleton className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden" />
      <Skeleton className="w-28 h-4" />
    </div>
  );
}

export default function ChatLayoutSkeleton() {
  return (
    <nav className="flex flex-col overflow-y-auto space-y-1">
      {[...Array(6)].map((_, i) => (
        <ConversationItemSkeleton key={i} />
      ))}
    </nav>
  );
}
