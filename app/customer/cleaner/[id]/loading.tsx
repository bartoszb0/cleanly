import CleanerInfoSkeleton from "@/components/cleaner/profile/cleaner-info-skeleton";
import CleanerOpinionsSkeleton from "@/components/cleaner/profile/opinions/cleaner-opinions-skeleton";

export default function CleanerPageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <CleanerInfoSkeleton />
        <CleanerOpinionsSkeleton />
      </div>
    </div>
  );
}
