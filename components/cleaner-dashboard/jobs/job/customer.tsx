import { Button } from "@/components/ui/button";
import { ExtendedJob } from "@/types";
import { MessageCircle, Phone, User } from "lucide-react";
import Link from "next/link";
import InfoRow from "./info-row";

export default function JobCustomerInfo({
  job,
  conversationId,
}: {
  job: ExtendedJob;
  conversationId: string | null;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
        Customer
      </h2>
      <InfoRow icon={User} label="Name" value={job.customers.full_name} />
      <InfoRow icon={Phone} label="Phone" value={job.customers.phone} />
      {conversationId && (
        <Button variant="outline" className="w-full mt-3" asChild>
          <Link href={`/cleaner/messages/${conversationId}`}>
            <MessageCircle className="w-3.5 h-3.5" />
            Message customer
          </Link>
        </Button>
      )}
    </div>
  );
}
