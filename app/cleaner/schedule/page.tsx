"use client";

import { CleanerCalendar } from "@/components/cleaner-dashboard/schedule/calendar";
import { SelectedDayView } from "@/components/cleaner-dashboard/schedule/day-view";
import {
  getDayScheduleForCleaner,
  getMonthDaysOffForCleaner,
} from "@/lib/actions/schedule";
import { Tables } from "@/types/supabase";
import { CalendarDays } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const [isPending, startTransition] = useTransition();
  const [isMonthPending, startMonthTransition] = useTransition();

  const [selectedDateJobs, setSelectedDateJobs] = useState<Tables<"jobs">[]>(
    [],
  );
  const [daysOff, setDaysOff] = useState<Date[]>([]);

  useEffect(() => {
    startTransition(async () => {
      if (date) {
        try {
          setSelectedDateJobs(await getDayScheduleForCleaner(date));
        } catch (error) {
          toast.error("error");
        }
      } else {
        setSelectedDateJobs([]);
      }
    });
  }, [date]);

  useEffect(() => {
    startMonthTransition(async () => {
      try {
        setDaysOff(await getMonthDaysOffForCleaner(currentMonth));
      } catch {
        toast.error("Failed to load days off");
      }
    });
  }, [currentMonth]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <CalendarDays className="text-primary" size={22} />
          Schedule
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your availability and view upcoming jobs
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-2 sm:p-4 mb-6">
        <CleanerCalendar
            date={date}
            setDate={setDate}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            daysOff={daysOff}
            isPending={isMonthPending}
          />
      </div>

      <SelectedDayView
        date={date}
        isPending={isPending}
        selectedDateJobs={selectedDateJobs}
        daysOff={daysOff}
        onDayOffChange={() => {
          startMonthTransition(async () => {
            try {
              setDaysOff(await getMonthDaysOffForCleaner(currentMonth));
            } catch {
              toast.error("Failed to refresh days off");
            }
          });
        }}
      />
    </div>
  );
}
