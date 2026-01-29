import CleanersList from "@/components/cleaner/cleaner-list";
import CleanerListSkeleton from "@/components/cleaner/cleaner-list-skeleton";
import { Button } from "@/components/ui/button";
import { getCurrentCustomer } from "@/lib/data/customer";
import getUppercaseCityName from "@/lib/utils";
import { Suspense } from "react";

export default async function CustomerPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const user = await getCurrentCustomer();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-10 text-center">
        Cleaners in {getUppercaseCityName(user.city)}
      </h1>
      <div className="flex flex-row gap-4 mt-5">
        {/* TODO */}
        <Button>Input - Search by name</Button>
        <Button>Sort</Button>
        <Button>Filter</Button>
      </div>
      <Suspense fallback={<CleanerListSkeleton />}>
        <CleanersList user={user} page={currentPage} />
      </Suspense>
    </div>
  );
}
