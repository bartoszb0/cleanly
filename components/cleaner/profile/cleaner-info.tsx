import { Button } from "@/components/ui/button";
import { getCleaner, getCleanerDaysOff } from "@/lib/data/cleaners";
import { formatDate, getUppercaseCityName } from "@/lib/utils";
import {
  BrushCleaning,
  Calendar,
  CircleOff,
  MapPin,
  Package,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import BookCleanerDialog from "./booking/book-dialog";

type CleanerInfoProps = {
  id: string;
};

export default async function CleanerInfo({ id }: CleanerInfoProps) {
  const cleaner = await getCleaner(id);
  const daysOffData = await getCleanerDaysOff(id);

  if (!cleaner) {
    return notFound();
  }

  return (
    <>
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-6">
        <div className="flex flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-xl">
              {cleaner.avatar_url ? (
                <Image
                  src={cleaner.avatar_url}
                  alt={cleaner.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-white font-bold text-5xl">
                  {cleaner.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {/* Name and Location */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-3">
              {cleaner.name}
            </h1>
            <div className="flex items-center gap-2 text-slate-300 mb-4">
              <MapPin size={20} className="text-sky-400" />
              <span className="text-md">
                {getUppercaseCityName(cleaner.city)}
              </span>
            </div>

            {/* Price Tag */}
            <div className="inline-flex items-baseline gap-2 bg-sky-600/20 border border-sky-500/30 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-sky-400 leading-none">
                  {cleaner.hourly_rate}
                </span>
                <span className="text-sm sm:text-base text-sky-400/80 leading-none">
                  PLN
                </span>
              </div>
              <span className="text-xs sm:text-sm text-slate-400">/hour</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {/* Experience */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-sky-500/20 rounded-lg">
              <BrushCleaning size={24} className="text-sky-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Completed jobs</p>
              <p className="text-white font-semibold text-lg">
                {cleaner.completed_jobs_count}
              </p>
            </div>
          </div>
        </div>
        {/* Supplies */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            {cleaner.supplies_provided ? (
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Package size={24} className="text-green-400" />
              </div>
            ) : (
              <div className="p-2 bg-red-500/20 rounded-lg">
                <CircleOff size={24} className="text-red-400" />
              </div>
            )}

            <div>
              <p className="text-slate-400 text-sm">Supplies</p>
              <div className="flex items-center gap-2">
                <p className="text-white font-semibold">
                  {cleaner.supplies_provided ? "Provided" : "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Member Since */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Calendar size={24} className="text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Member since</p>
              <p className="text-white font-semibold text-sm">
                {formatDate(cleaner.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 mb-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          About Me
        </h2>
        <p className="text-slate-300 leading-relaxed text-md">{cleaner.bio}</p>
      </div>

      {/* Contact Section */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
        <h2 className="text-xl font-bold text-white mb-4">
          Contact Information
        </h2>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-500/20 rounded-lg">
            <Phone size={24} className="text-sky-400" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Phone Number</p>
            <a
              href={`tel:${cleaner.phone}`}
              className="text-white font-semibold text-lg hover:text-sky-400 transition-colors"
            >
              {cleaner.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <div className="flex-1">
          <BookCleanerDialog
            cleanerHourlyRate={cleaner.hourly_rate}
            daysOffData={daysOffData.data}
          />
        </div>
        <div className="flex-1">
          <Button className="w-full h-16 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl transition-colors duration-200 font-semibold text-lg border border-slate-600">
            Send Message
          </Button>
        </div>
      </div>
    </>
  );
}
