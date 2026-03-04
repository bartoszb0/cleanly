"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function ChatMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const inConversation = pathname !== "/customer/messages";

  return (
    <main
      className={cn(
        "flex-1 flex-col relative ",
        inConversation ? "flex" : "hidden md:flex",
      )}
    >
      {children}
    </main>
  );
}
