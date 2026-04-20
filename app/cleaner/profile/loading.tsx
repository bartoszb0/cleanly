import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";

export default function ProfileLoading() {
  return (
    <div>
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

      {/* Identity card skeleton */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="w-16 h-16 rounded-full shrink-0" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-muted/50 rounded-xl p-4 flex flex-col items-center gap-2"
            >
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-6 w-8" />
              <Skeleton className="h-3 w-14" />
            </div>
          ))}
        </div>
      </div>

      {/* Form skeleton */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-4">
        <Skeleton className="h-3 w-20 mb-6" />

        <div className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-full" />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-24 w-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* City */}
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-9 w-full" />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-9 w-full" />
            </div>

            {/* Hourly rate */}
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-full" />
            </div>

            {/* Supplies */}
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-28" />
              <div className="flex items-center gap-3 h-9">
                <Skeleton className="h-5 w-9 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
  );
}
