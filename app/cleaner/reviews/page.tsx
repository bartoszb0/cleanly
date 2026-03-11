import OpinionsList from "@/components/cleaner-dashboard/reviews/opinions-list";
import { RatingSummary } from "@/components/cleaner-dashboard/reviews/rating-summary";
import { CLEANER_OPINIONS_PER_PAGE } from "@/lib/constants/opinions";
import { getCleanersOpinions } from "@/lib/data/cleaners";
import { MessageSquare } from "lucide-react";

export default async function ReviewsPage() {
  const opinionsData = await getCleanersOpinions(
    0,
    CLEANER_OPINIONS_PER_PAGE - 1,
    "newest",
  );

  return (
    <main className="flex-1 p-10">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
            <MessageSquare size={22} /> Reviews
          </h1>
          <p className="text-sm text-muted-foreground">
            What your customers say about you
          </p>
        </div>
      </div>

      {/* Summary */}
      <RatingSummary />

      {/* List and filtering */}
      <OpinionsList
        initialOpinions={opinionsData.opinions}
        totalCount={opinionsData.count}
      />
    </main>
  );
}
