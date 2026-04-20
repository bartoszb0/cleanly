"use client";

import { Button } from "@/components/ui/button";
import { cancelJobByCleaner, confirmJob } from "@/lib/actions/bookings";
import { useTransition } from "react";
import { toast } from "sonner";

export default function ConfirmationButtons({
  jobId,
  conflict,
}: {
  jobId: string;
  conflict: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await confirmJob(jobId);
      if (result.success) {
        toast.success("Job confirmed");
      } else {
        toast.error(result.error ?? "Something went wrong");
      }
    });
  };

  const handleCancel = () => {
    startTransition(async () => {
      const result = await cancelJobByCleaner(jobId);
      if (result.success) {
        toast.success("Job cancelled");
      } else {
        toast.error(result.error ?? "Something went wrong");
      }
    });
  };

  return (
    <div className="flex items-center justify-end mt-4">
      <div className="flex gap-2">
        <Button onClick={handleConfirm} disabled={conflict || isPending}>
          {isPending ? "Saving..." : "Confirm"}
        </Button>
        <Button
          variant="destructive"
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
