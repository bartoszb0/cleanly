import { ChatMain } from "@/components/conversations/chat-main";
import { ChatSidebar } from "@/components/conversations/chat-sidebar";
import CleanerChatListWrapper from "@/components/conversations/cleaner/cleaner-chat-list-wrapper";
import ChatLayoutSkeleton from "@/components/conversations/sidebar-skeleton";
import { Suspense } from "react";

export default function CleanerChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed top-16 md:top-0 left-0 md:left-64 right-0 bottom-0 flex flex-row overflow-hidden bg-background z-10">
      <ChatSidebar basePath="/cleaner/messages">
        <div className="p-4 border-b border-slate-800 text-center">
          <h2 className="text-2xl font-bold text-slate-100">Messages</h2>
        </div>
        <Suspense fallback={<ChatLayoutSkeleton />}>
          <CleanerChatListWrapper />
        </Suspense>
      </ChatSidebar>
      <ChatMain basePath="/cleaner/messages">{children}</ChatMain>
    </div>
  );
}
