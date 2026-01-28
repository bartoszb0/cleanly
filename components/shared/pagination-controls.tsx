"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4 mb-16">
      <div className="flex items-center gap-1">
        <Button
          onClick={() => handlePageChange(1)}
          variant={currentPage === 1 ? "paginationActive" : "transparent"}
          className="min-w-10"
        >
          1
        </Button>

        {currentPage > 3 && <span className="px-2 text-slate-400">...</span>}

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            // Show current page and one page on each side
            return (
              page > 1 && page < totalPages && Math.abs(page - currentPage) <= 1
            );
          })
          .map((page) => (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              variant={
                currentPage === page ? "paginationActive" : "transparent"
              }
              className="min-w-10"
            >
              {page}
            </Button>
          ))}

        {currentPage < totalPages - 2 && (
          <span className="px-2 text-slate-400">...</span>
        )}

        {totalPages > 1 && (
          <Button
            onClick={() => handlePageChange(totalPages)}
            variant={
              currentPage === totalPages ? "paginationActive" : "transparent"
            }
            className="min-w-10"
          >
            {totalPages}
          </Button>
        )}
      </div>
    </div>
  );
}
