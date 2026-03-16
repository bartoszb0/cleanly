import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getInitials } from "@/lib/utils";
import { Opinion } from "@/types";
import { format } from "date-fns";
import { Briefcase, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { StarRating } from "./star-rating";

export function OpinionCard({
  opinion,
  isOnReviewsPage = true,
}: {
  opinion: Opinion;
  isOnReviewsPage?: boolean;
}) {
  const date = format(new Date(opinion.created_at), "MMMM do, yyyy");
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">
            {getInitials(opinion.customers.full_name)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {opinion.customers.full_name}
            </p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
        <StarRating rating={opinion.rating} />
      </div>

      {/* Content */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {opinion.content}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-border text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <ThumbsUp size={16} />
            {opinion.likes_count}
          </div>
          <div className="flex items-center gap-1.5">
            <ThumbsDown size={16} />
            {opinion.dislikes_count}
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger>
            {isOnReviewsPage ? (
              <Link href={`/cleaner/jobs/${opinion.job_id}`}>
                <Briefcase size={19} />
              </Link>
            ) : (
              <Link href={`/cleaner/reviews`}>
                <Star size={19} />
              </Link>
            )}
          </TooltipTrigger>
          <TooltipContent>
            {isOnReviewsPage ? (
              <p>View job details</p>
            ) : (
              <p>View all reviews</p>
            )}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
