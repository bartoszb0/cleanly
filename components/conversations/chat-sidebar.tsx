"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function ChatSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const inConversation = pathname !== "/customer/messages";

  return (
    <aside
      className={cn(
        "border-r border-slate-800 flex-col bg-slate-900/50",
        "w-full md:w-60 md:flex",
        inConversation ? "hidden md:flex" : "flex",
      )}
    >
      {children}
    </aside>
  );
}
