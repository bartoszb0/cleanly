import { getCleanersOpinions, getCurrentCleaner } from "@/lib/data/cleaners";
import { Star } from "lucide-react";
import { StarRating } from "./star-rating";

export async function RatingSummary() {
  const cleaner = await getCurrentCleaner();
  const { opinions } = await getCleanersOpinions(0, 5, "newest");

  const dist = [5, 4, 3, 2, 1].map((r) => ({
    rating: r,
    count: opinions.filter((o) => o.rating === r).length,
    pct: opinions.length
      ? (opinions.filter((o) => o.rating === r).length / opinions.length) * 100
      : 0,
  }));

  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-6 flex flex-col sm:flex-row gap-6 sm:gap-10 items-center">
      {/* Big score */}
      <div className="text-center shrink-0">
        <div className="text-5xl font-bold text-foreground leading-none mb-2">
          {cleaner.average_rating.toFixed(1)}
        </div>
        <StarRating rating={Math.round(Number(cleaner.average_rating))} />
        <p className="text-xs text-muted-foreground mt-2">
          {cleaner.total_reviews} review{cleaner.total_reviews !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Distribution */}
      <div className="flex-1 w-full flex flex-col gap-2">
        {dist.map(({ rating, count, pct }) => (
          <div key={rating} className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-4 text-right">
              {rating}
            </span>
            <Star
              size={11}
              className="text-amber-400 fill-amber-400 shrink-0"
            />
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-4">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
