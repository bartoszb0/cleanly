import ChatListWrapper from "@/components/conversations/chat-list-wrapper";
import { ChatMain } from "@/components/conversations/chat-main";
import { ChatSidebar } from "@/components/conversations/chat-sidebar";
import ChatLayoutSkeleton from "@/components/conversations/sidebar-skeleton";
import { Suspense } from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-[calc(100dvh-64px)] md:h-dvh w-full overflow-hidden">
      <ChatSidebar>
        <div className="p-4 border-b border-slate-800 text-center">
          <h2 className="text-2xl font-bold text-slate-100">Messages</h2>
        </div>

        <Suspense fallback={<ChatLayoutSkeleton />}>
          <ChatListWrapper />
        </Suspense>
      </ChatSidebar>
      <ChatMain>{children}</ChatMain>
    </div>
  );
}
