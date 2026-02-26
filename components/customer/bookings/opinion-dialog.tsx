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
import { Field } from "@/components/ui/field";
import { StarRating } from "@/components/ui/star-rating";
import { Textarea } from "@/components/ui/textarea";
import { createOpinion } from "@/lib/actions/opinions";
import { ReviewFormValues, ReviewSchema } from "@/lib/schemas/reviewForm";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Star, StarIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type ReviewDialogProps = {
  jobId: string;
  cleanerName: string;
};

const ratingLabels: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Great",
  5: "Excellent",
};

export default function OpinionDialog({
  jobId,
  cleanerName,
}: ReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: ReviewFormValues) => {
    startTransition(async () => {
      const result = await createOpinion(jobId, data);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Review submitted successfully");
      }
    });
    handleOpenChange(false);
  };

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    reset();
  };

  const { control, handleSubmit, reset } = useForm<ReviewFormValues>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: { rating: 0, review: "" },
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="sm:w-auto gap-1.5 h-9 text-xs font-medium bg-yellow-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:text-amber-300 shadow-none">
          <StarIcon className="w-3.5 h-3.5" /> Leave a review
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border border-slate-800 rounded-2xl p-0 overflow-hidden ">
        {/* Accent line */}
        <div className="h-px bg-linear-to-r from-sky-500/0 via-amber-500/50 to-sky-500/0" />

        <div className="p-6 text-center">
          <DialogHeader className="items-center text-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-400" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-slate-100 text-base font-semibold text-center">
                How was your cleaning?
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-sm text-center">
                Rate your experience with {cleanerName}
              </DialogDescription>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isPending}>
              {/* Stars */}
              <Controller
                name="rating"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="flex flex-col items-center gap-2 mb-5">
                      <StarRating
                        value={field.value}
                        onChange={field.onChange}
                        size={32}
                        disabled={isPending}
                      />
                      {fieldState.error ? (
                        <span className="text-sm font-medium text-red-400 h-4">
                          {fieldState.error.message}
                        </span>
                      ) : (
                        <span
                          className={cn(
                            "text-sm font-medium transition-all duration-150 h-4",
                            field.value
                              ? "text-amber-400 opacity-100"
                              : "opacity-0",
                          )}
                        >
                          {ratingLabels[field.value]}
                        </span>
                      )}
                    </div>
                  </Field>
                )}
              />

              {/* Text */}
              <Controller
                name="review"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <Textarea
                      value={field.value}
                      onChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                      placeholder="Share your experience — what went well, what could be improved..."
                      className="resize-none bg-slate-800/50! border-slate-700! text-slate-200 placeholder:text-slate-600 focus-visible:ring-sky-500/30 focus-visible:border-sky-500/50 text-sm min-h-25 wrap-anywhere"
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {fieldState.error ? (
                        <span className="text-sm font-medium text-red-400">
                          {fieldState.error.message}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="text-[11px] text-slate-600">
                        {field.value.length}/500
                      </span>
                    </div>
                  </Field>
                )}
              />

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  type="button"
                  className="flex-1 h-9 text-xs font-medium border-slate-700 text-slate-300 hover:text-slate-100 hover:bg-slate-800 hover:border-slate-600 bg-transparent"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-9 text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:text-amber-300 shadow-none"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </div>
            </fieldset>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
