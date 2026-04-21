import { getConversationsForCleaner } from "@/lib/data/conversations";
import ChatList from "../chat-list";
import NoConversationsFound from "../no-conversations";

export default async function ChatListWrapper() {
  const conversations = await getConversationsForCleaner();

  if (!conversations || conversations.length === 0) {
    return <NoConversationsFound />;
  }

  return <ChatList initialConversations={conversations} basePath="/cleaner/messages" />;
}
