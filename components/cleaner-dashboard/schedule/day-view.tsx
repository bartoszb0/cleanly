"use client";

import { Button } from "@/components/ui/button";
import DayOffBtn from "@/components/ui/day-off-btn";
import { removeDayOff } from "@/lib/actions/schedule";
import { Tables } from "@/types/supabase";
import { format, isSameDay } from "date-fns";
import { CalendarOff, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import JobCard from "../jobs/job/job-card";
import DayTimeline from "../jobs/job/schedule-timeline";

type SelectedDayViewProps = {
  date: Date | undefined;
  isPending: boolean;
  selectedDateJobs: Tables<"jobs">[];
  daysOff: Date[];
  onDayOffChange: () => void;
};

export function SelectedDayView({
  date,
  isPending,
  selectedDateJobs,
  daysOff,
  onDayOffChange,
}: SelectedDayViewProps) {
  const [isRemovePending, startRemoveTransition] = useTransition();

  if (!date) return null;

  if (isPending)
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="animate-spin text-primary" size={24} />
      </div>
    );

  const isSelectedDayOff = daysOff.some((d) => isSameDay(d, date));

  function handleRemove() {
    startRemoveTransition(async () => {
      try {
        await removeDayOff(date!);
        onDayOffChange();
      } catch {
        toast.error("Failed to remove day off");
      }
    });
  }

  if (isSelectedDayOff)
    return (
      <div className="mt-6 bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-3 text-center">
        <CalendarOff size={24} className="text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">Day off</p>
        <p className="text-xs text-muted-foreground">
          You marked this day as unavailable.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemove}
          disabled={isRemovePending}
        >
          {isRemovePending ? (
            <Loader2 size={12} className="animate-spin mr-1" />
          ) : null}
          Remove day off
        </Button>
      </div>
    );

  const confirmedJobs = selectedDateJobs.filter(
    (job) => job.status === "confirmed" || job.status === "completed",
  );

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          {format(date, "MMMM do, yyyy")}
        </h2>
        {confirmedJobs.length === 0 && <DayOffBtn date={date} onSuccess={onDayOffChange} />}
      </div>

      {confirmedJobs.length > 0 && <DayTimeline schedule={confirmedJobs} />}

      {selectedDateJobs.length > 0 ? (
        <div className="mt-4 flex flex-col gap-3">
          {selectedDateJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground text-center py-6">
          No jobs on this day.
        </div>
      )}
    </div>
  );
}
