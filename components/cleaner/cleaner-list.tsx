import { getCleanersByCity } from "@/lib/data/cleaners";
import { getPaginationRange, getUppercaseCityName } from "@/lib/utils";
import { Customer } from "@/types";
import { redirect } from "next/navigation";
import { PaginationControls } from "../shared/pagination-controls";
import CleanerCard from "./cleaner-card";

type CleanerListProps = {
  user: Customer;
  page: number;
  searchName?: string;
};

export default async function CleanersList({
  user,
  page = 1,
  searchName,
}: CleanerListProps) {
  if (page < 1) redirect("/customer?page=1");

  const itemsPerPage = 6;
  const { startingRange, endingRange } = getPaginationRange(page, itemsPerPage);

  const { cleaners, count } = await getCleanersByCity(
    user.city,
    startingRange,
    endingRange,
    searchName,
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
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6 mt-10 p-4">
        {cleaners.map((cleaner) => (
          <CleanerCard key={cleaner.id} cleaner={cleaner} />
        ))}
      </div>
      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div>
  );
}
