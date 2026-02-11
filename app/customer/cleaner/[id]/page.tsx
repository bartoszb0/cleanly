import CleanerInfo from "@/components/cleaner/profile/cleaner-info";
import CleanerInfoSkeleton from "@/components/cleaner/profile/cleaner-info-skeleton";
import CleanerOpinions from "@/components/cleaner/profile/opinions/cleaner-opinions";
import CleanerOpinionsSkeleton from "@/components/cleaner/profile/opinions/cleaner-opinions-skeleton";
import { Suspense } from "react";

export default async function CleanerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<CleanerInfoSkeleton />}>
          <CleanerInfo id={id} />
        </Suspense>
        <Suspense fallback={<CleanerOpinionsSkeleton />}>
          <CleanerOpinions id={id} />
        </Suspense>
      </div>
    </div>
  );
}
