import { STATUS_CONFIG } from "@/lib/constants/status-config";
import { cn, getUppercaseCityName } from "@/lib/utils";
import { ExtendedBooking } from "@/types";
import { addHours, format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import CancelDialog from "./cancel-dialog";
import { MessageCleanerButton } from "./message-cleaner-btn";
import OpinionDialog from "./opinion-dialog";

export const BookingHistoryCard = ({ job }: { job: ExtendedBooking }) => {
  const config = STATUS_CONFIG[job.status] || {
    label: job.status,
    className: "bg-slate-700/50 text-slate-400 border-slate-600/20",
    accent: "from-slate-500/0 via-slate-500/30 to-slate-500/0",
  };

  const bookingStartTime = new Date(job.scheduled_at);
  const bookingEndTime = addHours(bookingStartTime, job.duration_hours);

  return (
    <div className="relative bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden mb-3 transition-colors duration-200">
      {/* Status accent line */}
      <div className={cn("h-px bg-linear-to-r", config.accent)} />

      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <Link
              href={`/customer/cleaner/${job.cleaner_id}`}
              className="hover:underline"
            >
              <h4 className="font-semibold text-slate-100 text-[15px] leading-tight">
                {job.cleaner.name}
              </h4>
            </Link>
            <p className="text-xs text-slate-500 mt-0.5">
              {getUppercaseCityName(job.city)}&nbsp;·&nbsp;{job.address}
            </p>
          </div>
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
              config.className,
            )}
          >
            {config.label}
          </span>
        </div>

        {/* Date / time / price row */}
        <div className="flex items-start justify-between gap-4">
          {/* Date and time stack vertically on mobile, inline on sm+ */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className="text-slate-300 text-[13px]">
                {format(bookingStartTime, "MMM d, yyyy")}
              </span>
            </div>

            <div className="hidden sm:block w-px h-3.5 bg-slate-700" />

            <div className="flex items-center gap-1.5 text-[13px]">
              <Clock className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className="text-slate-300">
                {format(bookingStartTime, "HH:mm")}–
                {format(bookingEndTime, "HH:mm")}
              </span>
              <span className="text-slate-600 text-xs">
                ({job.duration_hours}h)
              </span>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <span className="font-semibold text-slate-100 text-[15px]">
              {job.total_price}
            </span>
            <span className="text-slate-500 text-xs ml-1">PLN</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-2 sm:justify-end">
          <MessageCleanerButton cleanerId={job.cleaner_id} />

          {(job.status === "pending" || job.status === "confirmed") && (
            <CancelDialog jobId={job.id} />
          )}
          {job.status === "completed" && !job.review && (
            <OpinionDialog jobId={job.id} cleanerName={job.cleaner.name} />
          )}
        </div>
      </div>
    </div>
  );
};
