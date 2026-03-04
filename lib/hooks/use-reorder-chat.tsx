"use client";

import { Conversation } from "@/types";
import { useEffect, useState } from "react";
import { createClient } from "../supabase/client";

export default function useReorderChat(initialConversations: Conversation[]) {
  const [conversations, setConversations] = useState(initialConversations);

  const supabase = createClient();

  useEffect(() => {
    setConversations(initialConversations);
  }, [initialConversations]);

  useEffect(() => {
    const channel = supabase
      .channel("convo-updates")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "conversations" },
        (payload) => {
          // 1. Update the conversation in the list
          setConversations((current) => {
            const updated = current.map((c) => {
              if (c.id === payload.new.id) {
                // PRESERVE the cleaners object from the old state 'c'
                // but update the timestamp from 'payload.new'
                return {
                  ...c,
                  ...payload.new,
                  cleaners: c.cleaners, // This ensures 'cleaners' isn't lost
                };
              }
              return c;
            });
            // 2. Re-sort the list by last_message_at
            return updated.sort(
              (a, b) =>
                new Date(b.last_message_at).getTime() -
                new Date(a.last_message_at).getTime(),
            );
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return { conversations };
}
