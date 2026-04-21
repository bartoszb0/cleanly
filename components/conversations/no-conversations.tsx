import { MessageCircleDashed } from "lucide-react";

export default function NoConversationsFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 px-4 text-center mt-40">
      <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center">
        <MessageCircleDashed className="text-slate-500" size={50} />
      </div>
      <div>
        <p className="text-slate-300 font-medium text-sm">
          No conversations found
        </p>
      </div>
    </div>
  );
}
