import { StarIcon } from "lucide-react";

type CleanerAverageRatingProps = {
  ratingData: {
    average: number;
    total: number;
  };
};

export default function CleanerAverageRating({
  ratingData,
}: CleanerAverageRatingProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 bg-slate-700/50 backdrop-blur-sm border border-slate-700/50 rounded-xl px-3 sm:px-6 py-3 sm:py-4 transition-all duration-300">
      <StarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400" />
      <span className="text-xl sm:text-2xl font-semibold text-slate-100">
        {ratingData.average.toFixed(1)}
      </span>
      <div className="h-5 sm:h-6 w-px bg-slate-700/50" />
      <span className="text-xs sm:text-sm text-slate-400">
        {ratingData.total} reviews
      </span>
    </div>
  );
}
