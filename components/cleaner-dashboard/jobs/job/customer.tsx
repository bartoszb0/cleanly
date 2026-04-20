import { Button } from "@/components/ui/button";
import { ExtendedJob } from "@/types";
import { Phone, User } from "lucide-react";
import InfoRow from "./info-row";

export default function JobCustomerInfo({ job }: { job: ExtendedJob }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
        Customer
      </h2>
      <InfoRow icon={User} label="Name" value={job.customers.full_name} />
      <InfoRow icon={Phone} label="Phone" value={job.customers.phone} />
      <Button variant="outline" className="w-full mt-3">
        Message customer
      </Button>
    </div>
  );
}
