import { getCleaner } from "@/lib/data/cleaners";
import {
  displayYearsOfExperience,
  formatDate,
  getUppercaseCityName,
} from "@/lib/utils";
import {
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Phone,
  XCircle,
} from "lucide-react";
import Image from "next/image";

type CleanerInfoProps = {
  id: string;
};

export default async function CleanerInfo({ id }: CleanerInfoProps) {
  const cleaner = await getCleaner(id);

  return (
    <>
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-xl">
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
            <div className="inline-flex items-baseline gap-2 bg-sky-600/20 border border-sky-500/30 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold text-sky-400">
                {cleaner.hourly_rate} PLN
              </span>
              <span className="text-slate-400">/hour</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Experience */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-sky-500/20 rounded-lg">
              <Clock size={24} className="text-sky-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Experience</p>
              <p className="text-white font-semibold text-lg">
                {displayYearsOfExperience(cleaner.experience_years)}
              </p>
            </div>
          </div>
        </div>

        {/* Supplies */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Package size={24} className="text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Supplies</p>
              <div className="flex items-center gap-2">
                {cleaner.supplies_provided ? (
                  <>
                    <CheckCircle size={18} className="text-green-400" />
                    <p className="text-white font-semibold">Provided</p>
                  </>
                ) : (
                  <>
                    <XCircle size={18} className="text-red-500" />
                    <p className="text-white font-semibold">Not included</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Member Since */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
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
        <button className="flex-1 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-sky-500/20">
          Book Now
        </button>
        <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl transition-colors duration-200 font-semibold text-lg border border-slate-600">
          Send Message
        </button>
      </div>
    </>
  );
}
