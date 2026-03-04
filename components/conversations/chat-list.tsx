"use client";

import useReorderChat from "@/lib/hooks/use-reorder-chat";
import { Conversation } from "@/types";
import { ChatListItem } from "./chat-list-item";

export default function ChatList({
  initialConversations,
}: {
  initialConversations: Conversation[];
}) {
  const { conversations } = useReorderChat(initialConversations);

  return (
    <nav className="flex flex-col overflow-y-auto space-y-1 p-2">
      {conversations.map((chat) => (
        <ChatListItem key={chat.id} chat={chat} />
      ))}
    </nav>
  );
}
