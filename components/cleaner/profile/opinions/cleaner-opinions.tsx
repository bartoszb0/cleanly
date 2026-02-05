import { CustomerProvider } from "@/components/providers/customer-provider";
import { getCleaner, getCleanerOpinions } from "@/lib/data/cleaners";
import { getCurrentCustomer } from "@/lib/data/customer";
import CleanerAverageRating from "./cleaner-average-rating";
import CleanerOpinionsList from "./cleaner-opinions-list";

export default async function CleanerOpinions({ id }: { id: string }) {
  const [data, cleanerRatingData, customer] = await Promise.all([
    getCleanerOpinions(id, 0, 4),
    getCleaner(id),
    getCurrentCustomer(),
  ]);

  if (!data || data.count === 0 || !cleanerRatingData) {
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
        <CleanerAverageRating
          average={cleanerRatingData.average_rating}
          total={cleanerRatingData.total_reviews}
        />
      </div>
      <CustomerProvider customer={customer}>
        <CleanerOpinionsList
          cleanerId={id}
          initialOpinions={opinions}
          totalCount={count}
        />
      </CustomerProvider>
    </div>
  );
}
