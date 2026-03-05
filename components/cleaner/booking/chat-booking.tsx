"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tables } from "@/types/supabase";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";
import BookingFormContent from "./booking-form-content";

export function ChatBooking({
  cleaner,
  daysOffData,
}: {
  cleaner: Tables<"cleaners">;
  daysOffData: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip>
      <Dialog open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button type="button">
              <CalendarPlus />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>

        <BookingFormContent
          cleanerId={cleaner.id}
          daysOffData={daysOffData}
          cleanerHourlyRate={cleaner.hourly_rate}
        />
      </Dialog>

      <TooltipContent>
        <p>Book cleaning</p>
      </TooltipContent>
    </Tooltip>
  );
}
