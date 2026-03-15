import { MessageSquare } from "lucide-react";

export default function ReviewsHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <MessageSquare className="text-primary" size={22} /> Reviews
        </h1>
        <p className="text-sm text-muted-foreground">
          What your customers say about you
        </p>
      </div>
    </div>
  );
}
