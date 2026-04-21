import CleanerConversationHeader from "@/components/conversations/cleaner-conversation-header";
import { RealtimeChat } from "@/components/conversations/realtime-chat";
import { saveMessageAsCleaner } from "@/lib/actions/conversations";
import { getCurrentCleaner } from "@/lib/data/cleaners";
import {
  getConversationMessages,
  getCustomerByConversationId,
} from "@/lib/data/conversations";
import { notFound } from "next/navigation";
import z from "zod";

export default async function CleanerConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!z.uuid().safeParse(id).success) return notFound();

  const [cleaner, messages, customer] = await Promise.all([
    getCurrentCleaner(),
    getConversationMessages(id),
    getCustomerByConversationId(id),
  ]);

  if (!customer) return notFound();

  return (
    <>
      <CleanerConversationHeader customer={customer} />
      <div className="flex-1 min-h-0">
        <RealtimeChat
          conversationId={id}
          username={cleaner.name}
          messages={messages}
          saveMessageFn={saveMessageAsCleaner}
        />
      </div>
    </>
  );
}
