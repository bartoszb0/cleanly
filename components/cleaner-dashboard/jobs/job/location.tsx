import { getUppercaseCityName } from "@/lib/utils";
import { Tables } from "@/types/supabase";
import { MapPin } from "lucide-react";
import InfoRow from "./info-row";

export default function JobLocationInfo({ job }: { job: Tables<"jobs"> }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
        Location
      </h2>
      <InfoRow icon={MapPin} label="Address" value={job.address} />
      <InfoRow icon={MapPin} label="Post code" value={job.post_code} />
      <InfoRow
        icon={MapPin}
        label="City"
        value={getUppercaseCityName(job.city)}
      />
    </div>
  );
}
