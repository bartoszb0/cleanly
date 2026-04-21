"use server";

import { createClient } from "@/lib/supabase/server";
import { MessageInsert } from "@/types";
import { TablesInsert } from "@/types/supabase";
import { getCurrentCustomer } from "../data/customer";

export async function getOrCreateConversation(cleanerId: string) {
  const supabase = await createClient();
  const user = await getCurrentCustomer();

  // 1. Check if a conversation already exists
  const { data: existing } = await supabase
    .from("conversations")
    .select("id")
    .eq("customer_id", user.id)
    .eq("cleaner_id", cleanerId)
    .single();

  if (existing) {
    return { success: existing.id };
  }

  // 2. If not, create a new one
  const { data: newRoom, error: createError } = await supabase
    .from("conversations")
    .insert({
      customer_id: user.id,
      cleaner_id: cleanerId,
    })
    .select("id")
    .single();

  if (createError) {
    return { success: false, error: "Could not start a conversation." };
  }

  return { success: newRoom.id };
}

export async function saveMessage(
  conversationId: string,
  content: string,
  bookingId?: string,
) {
  const supabase = await createClient();
  const user = await getCurrentCustomer();

  // sender_type is filled by a DB trigger
  const messageData: MessageInsert = {
    sender_id: user.id,
    conversation_id: conversationId,
    content: content,
    ...(bookingId && { booking_id: bookingId }),
  };

  const { data, error } = await supabase
    .from("messages")
    .insert(messageData as TablesInsert<"messages">)
    .select("*")
    .single();

  if (error || !data)
    return { success: null, error: error?.message ?? "Failed to save message" };

  return { success: data };
}
