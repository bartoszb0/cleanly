import JobConfirmationSection from "@/components/cleaner-dashboard/jobs/job/confirmation-section";
import JobCustomerInfo from "@/components/cleaner-dashboard/jobs/job/customer";
import JobHeader from "@/components/cleaner-dashboard/jobs/job/header";
import JobInformations from "@/components/cleaner-dashboard/jobs/job/job-details";
import JobReview from "@/components/cleaner-dashboard/jobs/job/job-review";
import JobLocationInfo from "@/components/cleaner-dashboard/jobs/job/location";
import JobTimeline from "@/components/cleaner-dashboard/jobs/job/timeline";
import { getConversationIdByCustomer } from "@/lib/data/conversations";
import { getJobDetails } from "@/lib/data/bookings";
import { notFound } from "next/navigation";
import z from "zod";

export default async function JobDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!z.uuid().safeParse(id).success) return notFound();

  const job = await getJobDetails(id);

  if (!job) return notFound();

  const conversationId = await getConversationIdByCustomer(job.customer_id);
  const scheduledDate = new Date(job.scheduled_at);
  const endTime = new Date(job.end_time);

  return (
    <div>
      <div className="bg-card border border-border rounded-2xl p-6 mb-4">
        {/* Header */}
        <JobHeader job={job} scheduledDate={scheduledDate} />

        {/* Time bar */}
        <JobTimeline
          jobDurationHours={job.duration_hours}
          scheduledDate={scheduledDate}
          endTime={endTime}
        />
      </div>

      {/* Action */}
      {job.status === "pending" && <JobConfirmationSection job={job} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Location */}
        <JobLocationInfo job={job} />

        {/* Customer */}
        <JobCustomerInfo job={job} conversationId={conversationId} />
      </div>

      {/* Job info */}
      <JobInformations job={job} scheduledDate={scheduledDate} />

      {job.status === "completed" && <JobReview jobId={job.id} />}
    </div>
  );
}
