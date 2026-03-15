import { getUppercaseCityName } from "@/lib/utils";
import { Tables } from "@/types/supabase";
import { format } from "date-fns";
import {
  Calendar,
  KeyRound,
  MapPin,
  Package,
  Phone,
  Wallet,
} from "lucide-react";

export default function CleanerDetails({
  cleaner,
}: {
  cleaner: Tables<"cleaners">;
}) {
  const memberSince = format(new Date(cleaner.created_at), "MMMM yyyy");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Services */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">
          Services
        </h3>
        <div className="flex flex-col gap-4">
          {[
            {
              label: "Hourly rate",
              value: `${cleaner.hourly_rate} PLN / hr`,
              icon: Wallet,
            },
            {
              label: "Cleaning supplies",
              value: cleaner.supplies_provided ? "Provided" : "Not provided",
              icon: Package,
              highlight: cleaner.supplies_provided,
            },
            {
              label: "City",
              value: getUppercaseCityName(cleaner.city),
              icon: MapPin,
            },
          ].map(({ label, value, icon: Icon, highlight }, i, arr) => (
            <div
              key={label}
              className={`flex items-center justify-between ${i < arr.length - 1 ? "pb-4 border-b border-border" : ""}`}
            >
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Icon size={15} />
                {label}
              </span>
              <span
                className={`text-sm font-semibold ${highlight ? "text-primary bg-primary/10 px-3 py-0.5 rounded-full" : "text-foreground"}`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Account */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">
          Account
        </h3>
        <div className="flex flex-col gap-4">
          {[
            {
              label: "Account ID",
              value: cleaner.id.slice(0, 8) + "…",
              icon: KeyRound,
              mono: true,
            },
            { label: "Phone", value: cleaner.phone, icon: Phone },
            { label: "Member since", value: memberSince, icon: Calendar },
          ].map(({ label, value, icon: Icon, mono }, i, arr) => (
            <div
              key={label}
              className={`flex items-center justify-between ${i < arr.length - 1 ? "pb-4 border-b border-border" : ""}`}
            >
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Icon size={15} />
                {label}
              </span>
              <span
                className={`text-sm font-semibold text-foreground ${mono ? "font-mono" : ""}`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
