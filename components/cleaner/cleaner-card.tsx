import { getUppercaseCityName } from "@/lib/utils";
import { Tables } from "@/types/supabase";
import { BrushCleaning, MapPin, Package, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type CleanerCardProps = {
  cleaner: Tables<"cleaners">;
};

export default function CleanerCard({ cleaner }: CleanerCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-sky-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/10">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {/* Changed w-20 h-20 to w-14 h-14 on mobile, and sm:w-20 sm:h-20 for larger screens */}
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
            {cleaner.avatar_url ? (
              <Image
                src={cleaner.avatar_url}
                alt={cleaner.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            ) : (
              /* Adjusted text size for smaller mobile circle */
              <span className="text-white font-bold text-xl sm:text-2xl">
                {cleaner.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name, Location and Right Content */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {cleaner.name}
              </h3>
              <div className="flex items-center gap-1 text-slate-400 text-sm">
                <MapPin size={14} />
                <span>{getUppercaseCityName(cleaner.city)}</span>
              </div>
            </div>

            {/* Right side content - add your content here */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                {cleaner.total_reviews > 0 ? (
                  <>
                    <StarIcon className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                    <span className="font-bold">
                      {cleaner.average_rating.toFixed(1)}
                    </span>
                    <span className="text-slate-500 text-sm">
                      ({cleaner.total_reviews})
                    </span>
                  </>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        New
                      </span>
                      {/* This text hides on mobile (hidden) and shows on small screens (sm:block) */}
                      <span className="hidden sm:block text-slate-400 text-xs italic">
                        No opinions yet
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-slate-300 text-sm mb-4 line-clamp-2">
            {cleaner.bio}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <BrushCleaning size={16} className="text-sky-400" />
              <span className="text-slate-300">Jobs: </span>
              <span>{cleaner.completed_jobs_count}</span>
            </div>
            {cleaner.supplies_provided && (
              <div className="flex items-center gap-2 text-sm">
                <Package size={16} className="text-green-400" />
                <span className="text-slate-300">Brings supplies</span>
              </div>
            )}
          </div>

          {/* Price and Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-slate-700/50 gap-4">
            <div>
              <span className="text-xl sm:text-2xl font-bold text-white">
                {cleaner.hourly_rate} PLN
              </span>
              <span className="text-slate-400 text-xs sm:text-sm ml-1">
                /hour
              </span>
            </div>
            <Button asChild>
              <Link href={`/customer/cleaner/${cleaner.id}`}>View Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
