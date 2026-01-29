import { getCleanersByCity } from "@/lib/data/cleaners";
import { getUppercaseCityName } from "@/lib/utils";
import { Customer } from "@/types/supabase";
import { PaginationControls } from "../shared/pagination-controls";
import CleanerCard from "./cleaner-card";

type CleanerListProps = {
  user: Customer;
  page: number;
};

export default async function CleanersList({
  user,
  page = 1,
}: CleanerListProps) {
  const itemsPerPage = 6;
  const startingRange = (page - 1) * itemsPerPage;
  const endingRange = startingRange + itemsPerPage - 1;

  const { cleaners, count } = await getCleanersByCity(
    user.city,
    startingRange,
    endingRange,
  );

  if (!count || count === 0) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <div className="text-slate-400 mb-2">
          No cleaners available in {getUppercaseCityName(user.city)}
        </div>
        <p className="text-sm text-slate-500">
          Try adjusting your filters or checking a nearby area.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6 mt-10 p-4">
        {cleaners.map((cleaner) => (
          <CleanerCard key={cleaner.id} cleaner={cleaner} />
        ))}
      </div>
      <PaginationControls
        currentPage={page}
        totalPages={Math.ceil((count || 0) / itemsPerPage)}
      />
    </div>
  );
}
