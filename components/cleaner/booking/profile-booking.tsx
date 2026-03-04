"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import BookingFormContent from "./booking-form-content";

export function ProfileBooking({
  cleanerId,
  cleanerHourlyRate,
  daysOffData,
}: {
  cleanerId: string;
  cleanerHourlyRate: number;
  daysOffData: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-sky-600 h-16 hover:bg-sky-700 text-white font-semibold text-lg shadow-lg rounded-xl">
          Book Cleaning
        </Button>
      </DialogTrigger>

      <BookingFormContent
        cleanerId={cleanerId}
        daysOffData={daysOffData}
        cleanerHourlyRate={cleanerHourlyRate}
      />
    </Dialog>
  );
}
