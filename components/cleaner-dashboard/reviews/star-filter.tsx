import { Star } from "lucide-react";

export default function StarFilter({
  filterRating,
  setFilterRating,
}: {
  filterRating: number;
  setFilterRating: (r: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors cursor-pointer
              ${filterRating === 0 ? "bg-primary/10 text-primary border-primary/20" : "text-muted-foreground border-border hover:border-foreground/30"}`}
        onClick={() => setFilterRating(0)}
      >
        All
      </button>
      {[5, 4, 3, 2, 1].map((r) => (
        <button
          key={r}
          className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors cursor-pointer
                ${filterRating === r ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "text-muted-foreground border-border hover:border-foreground/30"}`}
          onClick={() => setFilterRating(r)}
        >
          <Star
            size={11}
            className={filterRating === r ? "fill-amber-400" : ""}
          />
          {r}
        </button>
      ))}
    </div>
  );
}
