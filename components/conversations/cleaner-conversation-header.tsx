import { getInitials } from "@/lib/utils";
import { Tables } from "@/types/supabase";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CleanerConversationHeader({
  customer,
}: {
  customer: Tables<"customers">;
}) {
  return (
    <div className="px-5 py-4 bg-slate-900/60 border-b border-slate-800 flex items-center gap-3 shrink-0">
      <Link
        href="/cleaner/messages"
        className="md:hidden text-slate-400 hover:text-white"
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>
      <div className="w-10 h-10 rounded-full bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center shrink-0">
        <span className="text-white font-bold text-base">
          {getInitials(customer.full_name)}
        </span>
      </div>
      <div>
        <p className="text-slate-100 font-semibold text-sm leading-tight">
          {customer.full_name}
        </p>
        <p className="text-xs text-slate-500">Customer</p>
      </div>
    </div>
  );
}
