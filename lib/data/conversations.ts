import { ChatMessage } from "@/types";
import { createClient } from "../supabase/server";
import { getCurrentCustomer } from "./customer";

export async function getCreatedConversations() {
  const supabase = await createClient();
  const user = await getCurrentCustomer();

  const { data, error } = await supabase
    .from("conversations")
    .select(
      `
      id,
      last_message_at,
      cleaners (
        name,
        avatar_url
      )
    `,
    )
    .eq("customer_id", user.id)
    .order("last_message_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCleanerByConversationId(conversationId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("conversations")
    .select(`cleaners (*)`)
    .eq("id", conversationId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  return data.cleaners;
}

export async function getConversationMessages(conversationId: string) {
  const supabase = await createClient();

  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  // Get unique sender IDs split by type
  const customerIds = messages
    .filter((m) => m.sender_type === "customer" && m.sender_id !== null)
    .map((m) => m.sender_id as string);

  const cleanerIds = messages
    .filter((m) => m.sender_type === "cleaner" && m.sender_id !== null)
    .map((m) => m.sender_id as string);

  // Fetch names in parallel
  const [{ data: customers }, { data: cleaners }] = await Promise.all([
    supabase.from("customers").select("id, full_name").in("id", customerIds),
    supabase.from("cleaners").select("id, name").in("id", cleanerIds),
  ]);

  // Build a lookup map
  const nameMap = new Map<string, string>([
    ...(customers ?? []).map((c) => [c.id, c.full_name] as [string, string]),
    ...(cleaners ?? []).map((c) => [c.id, c.name] as [string, string]),
  ]);

  const initialMessages = messages.map((msg) => ({
    id: msg.id,
    content: msg.content,
    createdAt: msg.created_at ?? new Date().toISOString(),
    user: {
      name: nameMap.get(msg.sender_id ?? "") ?? "System",
    },
    booking_id: msg.booking_id,
    message_type: (msg.message_type ?? "text") as
      | "text"
      | "booking"
      | "status_change",
    metadata: msg.metadata as ChatMessage["metadata"],
  })) as ChatMessage[];

  return initialMessages;
}
