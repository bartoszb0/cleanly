import { getCleanersByCity } from "@/lib/queries/cleaners";
import { Customer } from "@/types/supabase";
import CleanerCard from "./cleaner-card";
import { PaginationControls } from "./pagination-controls";

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
