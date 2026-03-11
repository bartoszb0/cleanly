import { Tables } from "@/types/supabase";
import { Check, MessageSquareMore, StarIcon } from "lucide-react";

function StatCard({ label, value, suffix, icon }: any) {
  const Icon = icon;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
      <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-3">
        {label}
      </div>
      <div className="text-4xl font-bold text-card-foreground leading-none">
        {value}
        {suffix && (
          <span className="text-sm text-muted-foreground font-normal ml-1">
            {suffix}
          </span>
        )}
      </div>
      <div className="absolute top-4 right-4 text-xl opacity-40">
        <Icon className="text-primary" />
      </div>
    </div>
  );
}

export default function CleanerStats({
  cleaner,
}: {
  cleaner: Tables<"cleaners">;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <StatCard
        label="Completed Jobs"
        value={cleaner.completed_jobs_count}
        icon={Check}
        suffix={undefined}
      />
      <StatCard
        label="Average Rating"
        value={cleaner.average_rating.toFixed(1) || "—"}
        suffix={cleaner.average_rating ? "/ 5" : ""}
        icon={StarIcon}
      />
      <StatCard
        label="Total Reviews"
        value={cleaner.total_reviews}
        icon={MessageSquareMore}
        suffix={undefined}
      />
    </div>
  );
}
