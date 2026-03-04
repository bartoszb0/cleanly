import { MessageCircleQuestion } from "lucide-react";

export default function ChatNotFound() {
  return (
    <div className="flex h-full items-center justify-center flex-col text-zinc-600">
      <MessageCircleQuestion size={120} />
      <p className="mt-10">Chat not found</p>
    </div>
  );
}
