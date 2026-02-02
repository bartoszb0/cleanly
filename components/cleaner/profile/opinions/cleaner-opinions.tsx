import { getCleanerOpinions, getCleanerRating } from "@/lib/data/cleaners";
import CleanerAverageRating from "./cleaner-average-rating";
import CleanerOpinionsList from "./cleaner-opinions-list";

export default async function CleanerOpinions({ id }: { id: string }) {
  const [data, ratingData] = await Promise.all([
    getCleanerOpinions(id, 0, 4),
    getCleanerRating(id),
  ]);

  if (!data || data.count === 0) {
    return (
      <p className="text-center mt-12 text-2xl italic text-slate-500">
        No opinions found
      </p>
    );
  }

  const { opinions, count } = data;

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Opinions</h1>
        <CleanerAverageRating ratingData={ratingData} />
      </div>
      <CleanerOpinionsList
        cleanerId={id}
        initialOpinions={opinions}
        totalCount={count}
      />
    </div>
  );
}
