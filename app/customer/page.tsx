import CleanersList from "@/components/cleaner/cleaner-list";
import CleanerListSkeleton from "@/components/cleaner/cleaner-list-skeleton";
import FilterControls from "@/components/cleaner/filter-controls";
import { getCurrentCustomer } from "@/lib/data/customer";
import { SuppliesOptions } from "@/lib/schemas/filterCleaners";
import { getUppercaseCityName } from "@/lib/utils";
import { Suspense } from "react";

export default async function CustomerPage({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    search: string;
    sort: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    jobs?: string;
    supplies?: SuppliesOptions;
    date?: string;
  }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const user = await getCurrentCustomer();

  return (
    <div className="flex flex-col items-center">
      <div className="p-4">
        <h1 className="text-4xl font-bold mt-10 text-center">
          Cleaners in {getUppercaseCityName(user.city)}
        </h1>
        <FilterControls />
      </div>
      <Suspense key={JSON.stringify(params)} fallback={<CleanerListSkeleton />}>
        <CleanersList
          user={user}
          page={currentPage}
          searchName={params.search}
          sortBy={params.sort}
          filters={{
            minPrice: params.minPrice,
            maxPrice: params.maxPrice,
            rating: params.rating,
            jobs: params.jobs,
            supplies: params.supplies,
            date: params.date,
          }}
        />
      </Suspense>
    </div>
  );
}
