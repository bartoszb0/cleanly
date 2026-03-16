import { getOpinion } from "@/lib/data/opinions";
import { MessageSquare } from "lucide-react";
import { OpinionCard } from "../../reviews/opinion-card";

export default async function JobReview({ jobId }: { jobId: string }) {
  const opinion = await getOpinion(jobId);

  return (
    <div className="mt-6">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
        Customer Review
      </h2>
      {opinion ? (
        <OpinionCard opinion={opinion} isOnReviewsPage={false} />
      ) : (
        <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-3 text-muted-foreground">
          <MessageSquare size={16} className="shrink-0" />
          <p className="text-sm">No review left for this job yet.</p>
        </div>
      )}
    </div>
  );
}
