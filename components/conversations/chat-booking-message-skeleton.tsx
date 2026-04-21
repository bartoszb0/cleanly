import { Loader2 } from "lucide-react";

export default function ChatBookingMessageSkeleton() {
  return (
    <div className="bg-slate-800/80 border h-50 border-slate-700/50 p-3.5 w-70 flex justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
