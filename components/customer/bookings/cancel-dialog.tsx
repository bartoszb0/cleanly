"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cancelBooking } from "@/lib/actions/bookings";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function CancelDialog({ jobId }: { jobId: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    startTransition(async () => {
      const result = await cancelBooking(jobId);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Cleaning has been cancelled");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="sm:w-auto gap-1.5 h-9 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 shadow-none">
          <X className="w-3.5 h-3.5" />
          Cancel Cleaning
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border border-slate-800 rounded-2xl p-0 overflow-hidden max-w-md">
        {/* Red accent line */}
        <div className="h-px bg-linear-to-r from-red-500/0 via-red-500/50 to-red-500/0" />

        <div className="p-6">
          {/* Icon + Header */}
          <DialogHeader className="items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>

            <div className="space-y-1.5">
              <DialogTitle className="text-slate-100 text-base font-semibold">
                Cancel this cleaning?
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-sm leading-relaxed">
                This action cannot be undone. The cleaner will be notified and
                your booking will be permanently cancelled.
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* Actions */}
          <div className="flex gap-2 mt-6">
            <Button
              variant="outline"
              className="flex-1 h-9 text-xs font-medium border-slate-700 text-slate-300 hover:text-slate-100 hover:bg-slate-800 hover:border-slate-600 bg-transparent"
              onClick={() => setOpen(false)}
            >
              Go back
            </Button>
            <Button
              className="flex-1 h-9 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 shadow-none"
              onClick={handleCancel}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Yes, cancel it"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
