import CleanerCalendar from "@/components/cleaner/profile/cleaner-calendar";
import CleanerCalendarSkeleton from "@/components/cleaner/profile/cleaner-calendar-skeleton";
import CleanerInfo from "@/components/cleaner/profile/cleaner-info";
import CleanerInfoSkeleton from "@/components/cleaner/profile/cleaner-info-skeleton";
import { Suspense } from "react";

export default async function CleanerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<CleanerInfoSkeleton />}>
          <CleanerInfo id={id} />
        </Suspense>
        <Suspense fallback={<CleanerCalendarSkeleton />}>
          <CleanerCalendar id={id} />
        </Suspense>
      </div>
    </div>
  );
}
