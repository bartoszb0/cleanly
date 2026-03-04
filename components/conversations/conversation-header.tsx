import { getCleanerDaysOff } from "@/lib/data/cleaners";
import { Tables } from "@/types/supabase";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ChatBooking } from "../cleaner/booking/chat-booking";

export default async function ConversationHeader({
  cleaner,
}: {
  cleaner: Tables<"cleaners">;
}) {
  const daysOffData = await getCleanerDaysOff(cleaner.id);

  return (
    <div className="px-5 py-4 bg-slate-900/60 border-b border-slate-800 flex justify-between items-center shrink-0">
      <div className="flex items-center gap-3">
        <Link
          href="/customer/messages"
          className="md:hidden text-slate-400 hover:text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>

        <div className="w-10 h-10 rounded-full bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-base">
            {cleaner.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <Link href={`/customer/cleaner/${cleaner.id}`}>
            <p className="text-slate-100 font-semibold text-sm leading-tight">
              {cleaner.name}
            </p>
          </Link>
          <p className="text-xs text-slate-500">Cleaner</p>
        </div>
      </div>
      <div>
        <ChatBooking cleaner={cleaner} daysOffData={daysOffData} />
      </div>
    </div>
  );
}
