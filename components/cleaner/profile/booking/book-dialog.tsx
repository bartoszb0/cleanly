"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createBookingRequest } from "@/lib/actions/bookings";
import {
  VALID_DURATIONS,
  VALID_HOURS,
  VALID_MINUTES,
} from "@/lib/constants/booking";
import { fetchDaySchedule } from "@/lib/data/schedule";
import { bookingSchema, BookingValues } from "@/lib/schemas/bookCleaner";
import { cn, getTomorrowDate } from "@/lib/utils";
import { ScheduledBooking } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function BookCleanerDialog({
  cleanerHourlyRate,
  daysOffData,
  cleanerId,
}: {
  cleanerHourlyRate: number;
  daysOffData: string[];
  cleanerId: string;
}) {
  const tomorrow = getTomorrowDate();

  // Convert to Date objects
  const daysOff = daysOffData.map((date) => new Date(date));

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: undefined,
      startHour: "",
      startMinute: "",
      duration: "",
    },
  });

  // Watch values to update the summary in real-time
  const watchedDate = watch("date");
  const watchedHour = watch("startHour");
  const watchedMinute = watch("startMinute");
  const watchedDuration = watch("duration");

  const bookingSummary = useMemo(() => {
    if (!watchedDate || !watchedHour || !watchedDuration || !watchedMinute)
      return null;
    const start = new Date(watchedDate);
    start.setHours(parseInt(watchedHour), parseInt(watchedMinute), 0, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + parseInt(watchedDuration));

    return {
      startFormatted: format(start, "HH:mm"),
      endFormatted: format(end, "HH:mm"),
      totalPrice: cleanerHourlyRate * parseInt(watchedDuration),
    };
  }, [
    watchedDate,
    watchedHour,
    watchedMinute,
    watchedDuration,
    cleanerHourlyRate,
  ]);

  const [dayBookings, setDayBookings] = useState<ScheduledBooking[]>([]);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState(false);

  // Function for updating cleaner's schedule
  const updateSchedule = async () => {
    if (!watchedDate || !cleanerId) return;

    setScheduleLoading(true);

    try {
      setScheduleError(false);
      setDayBookings(await fetchDaySchedule(watchedDate, cleanerId));
    } catch (err) {
      setScheduleError(true);
    } finally {
      setScheduleLoading(false);
    }
  };

  const onSubmit = (data: BookingValues) => {
    startTransition(async () => {
      const result = await createBookingRequest(data, cleanerId);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Booking request sent");
        updateSchedule();
      }
    });
  };

  useEffect(() => {
    updateSchedule();
  }, [watchedDate, cleanerId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-sky-600 h-16 hover:bg-sky-700 text-white font-semibold text-lg shadow-lg rounded-xl">
          Book Cleaning
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Select date, time and duration</DialogTitle>
        </DialogHeader>
        <div className="no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="space-y-6 py-4">
              {/* 1. Date Picker Controller */}
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Select Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          disabled={isPending}
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-slate-900/50 border-slate-700 h-11",
                            !field.value && "text-muted-foreground",
                            errors.date && "border-red-500",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={[{ before: tomorrow }, ...daysOff]}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.date && (
                      <p className="text-xs text-red-500">
                        {errors.date.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* 2. Start Time Controller */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Start Time</label>
                <div className="flex items-center gap-2">
                  <Controller
                    name="startHour"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isPending}
                      >
                        <SelectTrigger
                          className={cn(
                            "flex-1",
                            errors.startHour && "border-red-500",
                          )}
                        >
                          <SelectValue placeholder="HH" />
                        </SelectTrigger>
                        <SelectContent>
                          {VALID_HOURS.map((_, i) => (
                            <SelectItem key={i + 7} value={(i + 7).toString()}>
                              {i + 7}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <span className="text-slate-400 font-medium">:</span>
                  <Controller
                    name="startMinute"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isPending}
                      >
                        <SelectTrigger
                          className={cn(
                            "flex-1",
                            errors.startMinute && "border-red-500",
                          )}
                        >
                          <SelectValue placeholder="MM" />
                        </SelectTrigger>
                        <SelectContent>
                          {VALID_MINUTES.map((m) => (
                            <SelectItem key={m} value={m}>
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {(errors.startHour || errors.startMinute) && (
                  <p className="text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
                    Please select a valid time
                  </p>
                )}
              </div>

              {/* 3. Duration Controller (Styled as the filter buttons) */}
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Duration</label>
                    <div className="grid grid-cols-6 gap-2">
                      {VALID_DURATIONS.map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => field.onChange(h.toString())}
                          className={cn(
                            "rounded-lg py-2 text-sm font-medium transition-all duration-200 border",
                            field.value === h.toString()
                              ? "bg-sky-600 border-sky-500 text-white shadow-lg shadow-sky-500/10"
                              : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-sky-500/50",
                            isPending &&
                              (field.value === h.toString()
                                ? "opacity-100 cursor-not-allowed"
                                : "opacity-40 grayscale-[0.6] bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed"), // Dim the others
                          )}
                        >
                          {h}h
                        </button>
                      ))}
                    </div>
                    {errors.duration && (
                      <p className="text-xs text-red-500">
                        {errors.duration.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Display existing bookings or Error context */}
              {watchedDate && (
                <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                  <h4 className="text-sm font-medium mb-3 text-slate-400 text-center">
                    Cleaner's Schedule for {format(watchedDate, "MMM do, yyyy")}
                  </h4>

                  {scheduleError ? (
                    <div className="flex flex-col items-center justify-center py-2 text-center">
                      <p className="text-sm text-red-400 mb-1">
                        Failed to load schedule
                      </p>
                      <button
                        onClick={updateSchedule}
                        className="text-[12px] uppercase text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        Try again
                      </button>
                    </div>
                  ) : scheduleLoading ? (
                    <div className="flex items-center justify-center py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                    </div>
                  ) : dayBookings.length > 0 ? (
                    <ul className="space-y-1.5">
                      {dayBookings.map(
                        (booking: ScheduledBooking, i: number) => (
                          <li
                            key={i}
                            className="flex justify-between items-center text-sm px-3 py-2 rounded-lg bg-slate-800/50"
                          >
                            <span className="text-slate-300 tabular-nums">
                              {format(new Date(booking.scheduled_at), "HH:mm")}
                              {" – "}
                              {format(new Date(booking.end_time), "HH:mm")}
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-red-400">
                              Occupied
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  ) : (
                    <p className="text-sm text-emerald-400 text-center py-2">
                      Entire day is available!
                    </p>
                  )}
                </div>
              )}

              {/* 4. Real-time Summary & Validation Feedback */}
              {bookingSummary && (
                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Date</span>
                    <span className="text-sm font-medium text-slate-100">
                      {watchedDate ? format(watchedDate, "PPP") : "—"}
                    </span>
                  </div>
                  <div className="h-px bg-slate-700/50" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Schedule</span>
                    <span className="text-sm font-medium text-slate-100">
                      {bookingSummary.startFormatted} —{" "}
                      {bookingSummary.endFormatted}
                    </span>
                  </div>
                  <div className="h-px bg-slate-700/50" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">Total Price</span>
                    <span className="text-xl font-bold text-white">
                      {bookingSummary.totalPrice}{" "}
                      <span className="text-sm font-medium text-slate-400">
                        PLN
                      </span>
                    </span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700"
                disabled={isPending || scheduleError}
              >
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Send Booking Request"
                )}
              </Button>
            </fieldset>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
