import { ChatMessage } from "@/types";
import { createClient } from "../supabase/server";
import { getCurrentCleaner } from "./cleaners";
import { getCurrentCustomer } from "./customer";

export async function getCreatedConversations() {
  const supabase = await createClient();
  const user = await getCurrentCustomer();

  const { data, error } = await supabase
    .from("conversations")
    .select(`id, last_message_at, cleaners (name)`)
    .eq("customer_id", user.id)
    .order("last_message_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((c) => ({
    id: c.id,
    last_message_at: c.last_message_at,
    user: { name: (c.cleaners as { name: string } | null)?.name ?? "Unknown" },
  }));
}

export async function getCleanerByConversationId(conversationId: string) {
  const supabase = await createClient();
  const user = await getCurrentCustomer();

  const { data, error } = await supabase
    .from("conversations")
    .select(`cleaners (*)`)
    .eq("id", conversationId)
    .eq("customer_id", user.id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  return data.cleaners;
}

export async function getConversationsForCleaner() {
  const supabase = await createClient();
  const cleaner = await getCurrentCleaner();

  const { data: convos, error } = await supabase
    .from("conversations")
    .select("id, last_message_at, customer_id")
    .eq("cleaner_id", cleaner.id)
    .order("last_message_at", { ascending: false });

  if (error) throw new Error(error.message);
  if (!convos || convos.length === 0) return [];

  const customerIds = convos.map((c) => c.customer_id);
  const { data: customers } = await supabase
    .from("customers")
    .select("id, full_name")
    .in("id", customerIds);

  const nameMap = new Map((customers ?? []).map((c) => [c.id, c.full_name]));

  return convos.map((c) => ({
    id: c.id,
    last_message_at: c.last_message_at,
    user: { name: nameMap.get(c.customer_id) ?? "Unknown" },
  }));
}

export async function getCustomerByConversationId(conversationId: string) {
  const supabase = await createClient();
  const cleaner = await getCurrentCleaner();

  const { data: convo, error: convoError } = await supabase
    .from("conversations")
    .select("customer_id")
    .eq("id", conversationId)
    .eq("cleaner_id", cleaner.id)
    .maybeSingle();

  if (convoError) throw new Error(convoError.message);
  if (!convo) return null;

  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("*")
    .eq("id", convo.customer_id)
    .single();

  if (customerError) throw new Error(customerError.message);

  return customer;
}

export async function getConversationIdByCustomer(customerId: string) {
  const supabase = await createClient();
  const cleaner = await getCurrentCleaner();

  const { data, error } = await supabase
    .from("conversations")
    .select("id")
    .eq("cleaner_id", cleaner.id)
    .eq("customer_id", customerId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data?.id ?? null;
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
