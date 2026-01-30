import { PaginationControls } from "@/components/shared/pagination-controls";
import { Button } from "@/components/ui/button";
import { getCleanerOpinions } from "@/lib/data/cleaners";
import { getPaginationRange } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";
import CleanerOpinion from "./cleaner-opinion";

export default async function CleanerOpinions({
  id,
  page,
}: {
  id: string;
  page: number;
}) {
  if (page < 1) {
    redirect(`/customer/cleaner/${id}?page=1`);
  }

  const opinionsPerPage = 1;
  const { startingRange, endingRange } = getPaginationRange(
    page,
    opinionsPerPage,
  );

  const data = await getCleanerOpinions(id, startingRange, endingRange);

  if (!data) {
    return notFound();
  }

  const { opinions, count } = data;

  if (!count || count === 0) {
    return (
      <p className="text-center mt-12 text-2xl italic text-slate-500">
        No opinions found
      </p>
    );
  }

  return (
    <div className="mt-14">
      <h1 className="text-3xl font-bold">Opinions</h1>
      <div className="flex gap-2 mt-4">
        <Button>Sort</Button>
        <Button>Filter</Button>
      </div>
      {opinions.map((opinion) => (
        <CleanerOpinion key={opinion.id} opinion={opinion} />
      ))}

      <PaginationControls
        currentPage={page}
        totalPages={Math.ceil((count || 0) / opinionsPerPage)}
      />
    </div>
  );
}
