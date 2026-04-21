import { BOOKING_STATUS_CONFIG } from "@/lib/constants/booking-status-config";
import { createClient } from "@/lib/supabase/client";
import { cn, getUppercaseCityName } from "@/lib/utils";
import { Tables } from "@/types/supabase";
import { addHours, format } from "date-fns";
import {
  BrushCleaning,
  Calendar,
  Clock,
  History,
  Loader2,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ChatBookingMessage({
  bookingId,
  isOwnMessage,
}: {
  bookingId: string;
  isOwnMessage: boolean;
}) {
  const [booking, setBooking] = useState<Tables<"jobs"> | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", bookingId)
          .single();

        if (error) throw error;
        setBooking(data);
      } catch (err) {
        console.error("Error fetching booking:", err);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId, supabase]);

  if (loading) return <Loader2 className="animate-spin" />;
  if (!booking) return null;

  const start = new Date(booking.scheduled_at);
  const end = addHours(start, booking.duration_hours);

  return (
    <div className="bg-slate-800/80 border border-slate-700/50 p-3.5 w-70">
      <div className="flex items-center mb-3 justify-between">
        <div className="flex flex-row gap-1.5">
          <BrushCleaning className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
            Booking Request
          </span>
        </div>
        <Tooltip>
          <TooltipTrigger>
            <Link href="/customer/my-bookings">
              <History className="w-3.5 h-3.5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>View all bookings</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[13px] text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {format(start, "MMM d, yyyy")}
        </div>
        <div className="flex items-center gap-2 text-[13px] text-slate-300">
          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {format(start, "HH:mm")}–{format(end, "HH:mm")}
          <span className="text-slate-500 text-xs">
            ({booking.duration_hours}h)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          {booking.address}, {getUppercaseCityName(booking.city)}
        </div>
      </div>

      <div className="mt-1">
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border",
            BOOKING_STATUS_CONFIG[booking.status].className ??
              "bg-slate-700/50 text-slate-400 border-slate-600/20",
          )}
        >
          {BOOKING_STATUS_CONFIG[booking.status]?.label ?? booking.status}
        </span>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-700/50 flex justify-between items-center">
        <span className="text-xs text-slate-500">Total</span>
        <span className="font-semibold text-slate-100 text-sm">
          {booking.total_price}{" "}
          <span className="text-slate-500 font-normal text-xs">PLN</span>
        </span>
      </div>
    </div>
  );
}
