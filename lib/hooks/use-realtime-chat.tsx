"use client";

import { createClient } from "@/lib/supabase/client";
import { ChatMessage } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface UseRealtimeChatProps {
  conversationId: string;
  username: string;
}
const EVENT_MESSAGE_TYPE = "message";

export function useRealtimeChat({
  conversationId,
  username,
}: UseRealtimeChatProps) {
  const supabase = createClient();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [channel, setChannel] = useState<ReturnType<
    typeof supabase.channel
  > | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newChannel = supabase.channel(conversationId);

    newChannel
      .on("broadcast", { event: EVENT_MESSAGE_TYPE }, (payload) => {
        setMessages((current) => [...current, payload.payload as ChatMessage]);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      });

    setChannel(newChannel);

    return () => {
      supabase.removeChannel(newChannel);
    };
  }, [conversationId, username, supabase]);

  const confirmMessage = useCallback(
    (tempId: string, realMessage: ChatMessage) => {
      setMessages((current) =>
        current.map((msg) => (msg.id === tempId ? realMessage : msg)),
      );
    },
    [],
  );

  const markAsFailed = useCallback((id: string) => {
    setMessages((current) =>
      current.map((msg) =>
        msg.id === id ? { ...msg, isPending: false, hasError: true } : msg,
      ),
    );
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!channel || !isConnected) return null;

      const tempId = uuidv4();
      const message: ChatMessage = {
        id: tempId,
        content,
        user: { name: username },
        createdAt: new Date().toISOString(),
        isPending: true, // Mark as pending initially
        booking_id: null,
      };

      await channel.send({
        type: "broadcast",
        event: EVENT_MESSAGE_TYPE,
        payload: { ...message, isPending: false }, // Others see it as normal
      });

      // Update local state
      setMessages((current) => [...current, message]);

      return tempId;
    },
    [channel, isConnected, username],
  );

  return { messages, sendMessage, isConnected, confirmMessage, markAsFailed };
}
