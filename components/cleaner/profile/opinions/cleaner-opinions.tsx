import { getCleanerOpinions } from "@/lib/data/cleaners";
import { getCurrentCustomer } from "@/lib/data/customer";
import { CustomerProvider } from "@/lib/providers/customer-provider";
import { Tables } from "@/types/supabase";
import CleanerAverageRating from "./cleaner-average-rating";
import CleanerOpinionsList from "./cleaner-opinions-list";

export default async function CleanerOpinions({
  cleaner,
}: {
  cleaner: Tables<"cleaners">;
}) {
  const [data, customer] = await Promise.all([
    getCleanerOpinions(cleaner.id, 0, 4),
    getCurrentCustomer(),
  ]);

  if (!data || data.opinions.length === 0) {
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
          average={cleaner.average_rating}
          total={cleaner.total_reviews}
        />
      </div>
      <CustomerProvider customer={customer}>
        <CleanerOpinionsList
          cleanerId={cleaner.id}
          initialOpinions={opinions}
          totalCount={count}
        />
      </CustomerProvider>
    </div>
  );
}
