import ProfileForm from "@/components/cleaner-dashboard/profile/profile-form";
import { getCurrentCleaner } from "@/lib/data/cleaners";
import { format } from "date-fns";
import {
  Briefcase,
  Calendar,
  MessageSquareMore,
  Star,
  User,
} from "lucide-react";

export default async function Profile() {
  const cleaner = await getCurrentCleaner();
  const memberSince = format(new Date(cleaner.created_at), "MMMM yyyy");

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <User className="text-primary" size={22} />
          Profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage how you appear to customers
        </p>
      </div>

      {/* Identity card */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shrink-0">
            {cleaner.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-foreground">
                {cleaner.name}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Calendar size={13} />
              Member since {memberSince}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <Briefcase size={16} className="text-primary mx-auto mb-1.5" />
            <div className="text-xl font-bold text-foreground">
              {cleaner.completed_jobs_count}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Jobs done
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <Star size={16} className="text-primary mx-auto mb-1.5" />
            <div className="text-xl font-bold text-foreground">
              {cleaner.average_rating ? cleaner.average_rating.toFixed(1) : "—"}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Avg rating
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <MessageSquareMore
              size={16}
              className="text-primary mx-auto mb-1.5"
            />
            <div className="text-xl font-bold text-foreground">
              {cleaner.total_reviews}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">Reviews</div>
          </div>
        </div>
      </div>

      {/* Editable form */}
      <ProfileForm cleaner={cleaner} />
    </div>
  );
}
