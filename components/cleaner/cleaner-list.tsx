import { getCleanersByCity } from "@/lib/data/cleaners";
import { SuppliesOptions } from "@/lib/schemas/filterCleaners";
import {
  getPaginationRange,
  getUppercaseCityName,
  parseUrlDate,
} from "@/lib/utils";
import { Customer } from "@/types";
import { redirect } from "next/navigation";
import { PaginationControls } from "../shared/pagination-controls";
import CleanerCard from "./cleaner-card";

type CleanerListProps = {
  user: Customer;
  page: number;
  searchName?: string;
  sortBy?: string;
  filters: {
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    jobs?: string;
    supplies?: SuppliesOptions;
    date?: string;
  };
};

export default async function CleanersList({
  user,
  page = 1,
  searchName,
  sortBy,
  filters,
}: CleanerListProps) {
  if (page < 1) redirect("/customer?page=1");

  const itemsPerPage = 6;
  const { startingRange, endingRange } = getPaginationRange(page, itemsPerPage);

  const activeFilters = {
    priceRange: [
      Number(filters.minPrice) || 0,
      Number(filters.maxPrice) || 300,
    ] as [number, number],
    minRating: Number(filters.rating) || 0,
    minJobs: Number(filters.jobs) || 0,
    suppliesProvided: filters.supplies ?? "all",
    date: parseUrlDate(filters.date ?? null),
  };

  const { cleaners, count } = await getCleanersByCity(
    user.city,
    startingRange,
    endingRange,
    activeFilters,
    searchName,
    sortBy,
  );

  if (!count || count === 0) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <div className="text-slate-400 mb-2">
          No cleaners available in {getUppercaseCityName(user.city)}
        </div>
        <p className="text-sm text-slate-500">Try adjusting your filters.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(count / itemsPerPage);

  if (totalPages > 0 && page > totalPages) {
    redirect(`/customer?page=${totalPages}`);
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6 mt-4 p-4">
        {cleaners.map((cleaner) => (
          <CleanerCard key={cleaner.id} cleaner={cleaner} />
        ))}
      </div>
      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div>
  );
}
