import getUppercaseCityName from "@/lib/utils";
import { Tables } from "@/types/supabase";
import { Clock, MapPin, Package } from "lucide-react";
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
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
            {cleaner.avatar_url ? (
              <Image
                src={cleaner.avatar_url}
                alt={cleaner.name}
                width={80}
                height={80}
                className="object-cover"
              />
            ) : (
              <span className="text-white font-bold text-2xl">
                {cleaner.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name and Location */}
          <div className="mb-2">
            <h3 className="text-xl font-semibold text-white mb-1">
              {cleaner.name}
            </h3>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <MapPin size={14} />
              <span>{getUppercaseCityName(cleaner.city)}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-slate-300 text-sm mb-4 line-clamp-2">
            {cleaner.bio}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} className="text-sky-400" />
              <span className="text-slate-300">
                {cleaner.experience_years}{" "}
                {cleaner.experience_years === 1 ? "year" : "years"}
              </span>
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
