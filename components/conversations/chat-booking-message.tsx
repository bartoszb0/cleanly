import { BOOKING_STATUS_CONFIG } from "@/lib/constants/booking-status-config";
import { createClient } from "@/lib/supabase/client";
import { cn, getUppercaseCityName } from "@/lib/utils";
import { Tables } from "@/types/supabase";
import { addHours, format } from "date-fns";
import {
  Briefcase,
  BrushCleaning,
  Calendar,
  Clock,
  History,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import ChatBookingMessageSkeleton from "./chat-booking-message-skeleton";

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

  if (loading) return <ChatBookingMessageSkeleton />;
  if (!booking) return null;

  const start = new Date(booking.scheduled_at);
  const end = addHours(start, booking.duration_hours);

  return (
    <div className="bg-card border border-border p-3.5 w-70">
      <div className="flex items-center mb-3 justify-between">
        <div className="flex flex-row gap-1.5">
          <BrushCleaning className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Booking Request
          </span>
        </div>
        <Tooltip>
          <TooltipTrigger>
            {isOwnMessage ? (
              <Link href="/customer/my-bookings">
                <History className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            ) : (
              <Link href={`/cleaner/jobs/${bookingId}`}>
                <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            )}
          </TooltipTrigger>
          <TooltipContent>
            {isOwnMessage ? <p>View all bookings</p> : <p>View booking</p>}
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[13px] text-foreground">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          {format(start, "MMM d, yyyy")}
        </div>
        <div className="flex items-center gap-2 text-[13px] text-foreground">
          <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          {format(start, "HH:mm")}–{format(end, "HH:mm")}
          <span className="text-muted-foreground text-xs">
            ({booking.duration_hours}h)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-foreground">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          {booking.address}, {getUppercaseCityName(booking.city)}
        </div>
      </div>

      <div className="mt-1">
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border",
            BOOKING_STATUS_CONFIG[booking.status].className ??
              "bg-muted text-muted-foreground border-border",
          )}
        >
          {BOOKING_STATUS_CONFIG[booking.status]?.label ?? booking.status}
        </span>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
        <span className="text-xs text-muted-foreground">Total</span>
        <span className="font-semibold text-foreground text-sm">
          {booking.total_price}{" "}
          <span className="text-muted-foreground font-normal text-xs">PLN</span>
        </span>
      </div>
    </div>
  );
}
