import { getDayScheduleForCleaner } from "@/lib/data/schedule";
import { ScheduleSlot } from "@/types";
import { Tables } from "@/types/supabase";
import ConfirmationButtons from "./confirmation-buttons";
import ScheduleTimeline from "./schedule-timeline";

function hasConflict(
  pendingJob: { scheduled_at: string; end_time: string },
  schedule: ScheduleSlot[],
) {
  const pendingStart = new Date(pendingJob.scheduled_at).getTime();
  const pendingEnd = new Date(pendingJob.end_time).getTime();

  return schedule.some((slot) => {
    const slotStart = new Date(slot.scheduled_at).getTime();
    const slotEnd = new Date(slot.end_time).getTime();
    return pendingStart < slotEnd && pendingEnd > slotStart;
  });
}

export default async function JobConfirmationSection({
  job,
}: {
  job: Tables<"jobs">;
}) {
  const schedule = await getDayScheduleForCleaner(job.scheduled_at);

  const conflict = hasConflict(job, schedule);

  return (
    <div className="bg-primary/8 border border-primary/20 rounded-2xl px-6 py-5 mb-6">
      <ScheduleTimeline
        schedule={schedule}
        pendingJob={job}
        conflict={conflict}
      />
      <ConfirmationButtons jobId={job.id} conflict={conflict} />
    </div>
  );
}
