"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function ChatSidebar({
  children,
  basePath = "/customer/messages",
}: {
  children: React.ReactNode;
  basePath?: string;
}) {
  const pathname = usePathname();
  const inConversation = pathname !== basePath;

  return (
    <aside
      className={cn(
        "border-r border-border flex-col bg-slate-900/60",
        "w-full md:w-60 md:flex",
        inConversation ? "hidden md:flex" : "flex",
      )}
    >
      {children}
    </aside>
  );
}
