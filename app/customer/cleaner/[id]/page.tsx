import CleanerInfo from "@/components/cleaner/profile/cleaner-info";
import CleanerInfoSkeleton from "@/components/cleaner/profile/cleaner-info-skeleton";
import CleanerOpinions from "@/components/cleaner/profile/opinions/cleaner-opinions";
import CleanerOpinionsSkeleton from "@/components/cleaner/profile/opinions/cleaner-opinions-skeleton";
import { getCleaner } from "@/lib/data/cleaners";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import z from "zod";

export default async function CleanerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!z.uuid().safeParse(id).success) return notFound();

  const cleaner = await getCleaner(id);

  if (!cleaner) return notFound();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<CleanerInfoSkeleton />}>
          <CleanerInfo cleaner={cleaner} />
        </Suspense>
        <Suspense fallback={<CleanerOpinionsSkeleton />}>
          <CleanerOpinions cleaner={cleaner} />
        </Suspense>
      </div>
    </div>
  );
}
