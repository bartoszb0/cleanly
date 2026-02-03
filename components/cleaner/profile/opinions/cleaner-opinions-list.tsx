"use client";

import { Button } from "@/components/ui/button";
import { fetchMoreCleanerOpinions } from "@/lib/actions/cleaners";
import { cn } from "@/lib/utils";
import { Opinion, OpinionSortOption } from "@/types";
import { useState, useTransition } from "react";
import CleanerOpinion from "./cleaner-opinion";
import SortOpinionsSelectBtn from "./sort-opinions-select";

type CleanerOpinionsListProps = {
  cleanerId: string;
  initialOpinions: Opinion[];
  totalCount: number;
};

export default function CleanerOpinionsList({
  cleanerId,
  initialOpinions,
  totalCount,
}: CleanerOpinionsListProps) {
  const [opinions, setOpinions] = useState(initialOpinions);
  const [sortBy, setSortBy] = useState<OpinionSortOption>("newest");
  const [isPending, startTransition] = useTransition();

  const handleShowMore = () => {
    startTransition(async () => {
      const result = await fetchMoreCleanerOpinions(
        cleanerId,
        opinions.length,
        sortBy,
      );

      if (result.success) {
        setOpinions((prev) => [...prev, ...result.data]);
      }
    });
  };

  const handleSortChange = (newSort: OpinionSortOption) => {
    setSortBy(newSort);

    startTransition(async () => {
      const result = await fetchMoreCleanerOpinions(cleanerId, 0, newSort);

      if (result.success) {
        setOpinions(result.data);
      }
    });
  };

  return (
    <div>
      <div className="flex gap-2 mt-4">
        <SortOpinionsSelectBtn
          sortBy={sortBy}
          handleSortChange={handleSortChange}
        />
      </div>
      <div
        className={cn(
          "mt-8 space-y-6 transition-opacity duration-200",
          isPending ? "opacity-50 pointer-events-none" : "opacity-100",
        )}
      >
        {opinions.map((opinion) => (
          <CleanerOpinion key={opinion.id} opinion={opinion} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        {opinions.length < totalCount ? (
          <Button
            onClick={handleShowMore}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? "Loading..." : "Show more"}
          </Button>
        ) : (
          <p className="text-slate-500 italic">No more opinions to show</p>
        )}
      </div>
    </div>
  );
}
