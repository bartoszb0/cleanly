import ConversationHeader from "@/components/conversations/conversation-header";
import { RealtimeChat } from "@/components/conversations/realtime-chat";
import {
  getCleanerByConversationId,
  getConversationMessages,
} from "@/lib/data/conversations";
import { getCurrentCustomer } from "@/lib/data/customer";
import { notFound } from "next/navigation";
import z from "zod";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!z.uuid().safeParse(id).success) return notFound();

  const [user, messages, cleaner] = await Promise.all([
    getCurrentCustomer(),
    getConversationMessages(id),
    getCleanerByConversationId(id),
  ]);

  if (!cleaner) return notFound();

  return (
    <>
      <ConversationHeader cleaner={cleaner} />

      <div className="flex-1 min-h-0">
        <RealtimeChat
          conversationId={id}
          username={user.full_name}
          messages={messages}
        />
      </div>
    </>
  );
}
