import ReviewsHeader from "@/components/cleaner-dashboard/reviews/header";
import OpinionsList from "@/components/cleaner-dashboard/reviews/opinions-list";
import { RatingSummary } from "@/components/cleaner-dashboard/reviews/rating-summary";
import { RatingSummarySkeleton } from "@/components/cleaner-dashboard/reviews/summary-skeleton";
import { CLEANER_OPINIONS_PER_PAGE } from "@/lib/constants/opinions";
import { getCleanersOpinions } from "@/lib/data/cleaners";
import { Suspense } from "react";

export default async function ReviewsPage() {
  const opinionsData = await getCleanersOpinions(
    0,
    CLEANER_OPINIONS_PER_PAGE - 1,
    "newest",
  );

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page header */}
      <ReviewsHeader />

      {/* Summary */}
      <Suspense fallback={<RatingSummarySkeleton />}>
        <RatingSummary />
      </Suspense>

      {/* List and filtering */}
      <OpinionsList
        initialOpinions={opinionsData.opinions}
        totalCount={opinionsData.count}
      />
    </div>
  );
}
