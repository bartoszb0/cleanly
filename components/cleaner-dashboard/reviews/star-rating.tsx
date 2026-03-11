import { Opinion } from "@/types";
import { Star } from "lucide-react";

export function StarRating({ rating }: { rating: Opinion["rating"] }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={16}
          className={
            s <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-muted-foreground/30 fill-muted-foreground/10"
          }
        />
      ))}
    </div>
  );
}
