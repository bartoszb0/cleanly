"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function ChatMain({
  children,
  basePath = "/customer/messages",
}: {
  children: React.ReactNode;
  basePath?: string;
}) {
  const pathname = usePathname();
  const inConversation = pathname !== basePath;

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
