"use client";

import SortOpinionsSelectBtn from "@/components/cleaner/profile/opinions/sort-opinions-select";
import { Button } from "@/components/ui/button";
import { fetchMoreCleanerOpinions } from "@/lib/actions/cleaners";
import { cn } from "@/lib/utils";
import { Opinion, OpinionSortOption } from "@/types";
import { MessageSquare } from "lucide-react";
import { useState, useTransition } from "react";
import { OpinionCard } from "./opinion-card";
import StarFilter from "./star-filter";

export default function OpinionsList({
  initialOpinions,
  totalCount,
}: {
  initialOpinions: Opinion[];
  totalCount: number;
}) {
  const [opinions, setOpinions] = useState(initialOpinions);
  const [opinionsCount, setOpinionsCount] = useState(totalCount);
  const [sortBy, setSortBy] = useState<OpinionSortOption>("newest");
  const [filterRating, setFilterRating] = useState(0);

  const [isPending, startTransition] = useTransition();

  const handleShowMore = () => {
    startTransition(async () => {
      const result = await fetchMoreCleanerOpinions(
        opinions.length,
        sortBy,
        filterRating,
      );

      if (result.success) {
        setOpinions((prev) => [...prev, ...result.data]);
      }
    });
  };

  const handleSortChange = (newSort: OpinionSortOption) => {
    setSortBy(newSort);
    handleFetch(newSort, filterRating);
  };

  const handleFilterChange = (rating: number) => {
    const newSort =
      rating !== 0 && (sortBy === "highest" || sortBy === "lowest")
        ? "newest"
        : sortBy;
    setSortBy(newSort);

    setFilterRating(rating);
    handleFetch(newSort, rating);
  };

  const handleFetch = (newSort: OpinionSortOption, rating: number) => {
    startTransition(async () => {
      const result = await fetchMoreCleanerOpinions(0, newSort, rating);
      if (result.success) {
        setOpinions(result.data);
        setOpinionsCount(result.total ?? 0);
      }
    });
  };

  return (
    <>
      {/* Filter and sorting*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
        <StarFilter
          filterRating={filterRating}
          setFilterRating={handleFilterChange}
        />
        <SortOpinionsSelectBtn
          sortBy={sortBy}
          handleSortChange={handleSortChange}
          showSortingByRating={filterRating === 0}
        />
      </div>

      {/* Opinions */}
      {opinions.length === 0 ? (
        <div className="bg-card/40 border border-border rounded-2xl p-12 flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare size={20} className="text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground">No reviews yet</p>
          <p className="text-xs text-muted-foreground">
            Reviews from customers will appear here after completed jobs.
          </p>
        </div>
      ) : (
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-4",
            isPending ? "opacity-50 pointer-events-none" : "opacity-100",
          )}
        >
          {opinions.map((opinion) => (
            <OpinionCard key={opinion.id} opinion={opinion} />
          ))}
        </div>
      )}

      {/* Show more button*/}
      <div className="flex justify-center mt-5">
        {opinions.length < opinionsCount && (
          <Button
            onClick={handleShowMore}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? "Loading..." : "Show more"}
          </Button>
        )}
      </div>
    </>
  );
}
