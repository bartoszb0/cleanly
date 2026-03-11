"use client";

import { cn, getInitials } from "@/lib/utils";
import type { Conversation } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";

export function ChatListItem({ chat }: { chat: Conversation }) {
  const params = useParams();
  const isActive = params.id === chat.id;

  return (
    <Link
      href={`/customer/messages/${chat.id}`}
      className={cn(
        "flex items-center gap-3 rounded-xl transition-colors p-2",
        isActive
          ? "bg-sky-500/10 border border-sky-500/20"
          : "hover:bg-slate-800 border",
      )}
    >
      {/* Avatar */}
      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center">
        <span className="text-white font-bold text-lg sm:text-xl">
          {getInitials(chat.cleaners.name)}
        </span>
      </div>

      {/* Cleaners name */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-100 truncate">
          {chat.cleaners.name}
        </p>
      </div>
    </Link>
  );
}
