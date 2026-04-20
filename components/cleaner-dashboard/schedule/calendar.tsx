"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { addDays, endOfMonth, startOfMonth } from "date-fns";

export function CleanerCalendar({
  date,
  setDate,
  currentMonth,
  setCurrentMonth,
  daysOff,
  isPending,
}: {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  daysOff: Date[];
  isPending?: boolean;
}) {
  return (
    <div className="relative">
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/60 z-10 rounded-xl"></div>
      )}
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        disabled={[
          { before: startOfMonth(currentMonth) },
          { after: endOfMonth(currentMonth) },
        ]}
        fixedWeeks
        className="p-0 w-full bg-card [--cell-size:--spacing(10)] sm:[--cell-size:--spacing(14)] [&_table]:w-full [&_td]:w-full [&_th]:w-full"
        modifiers={{ daysOff: daysOff }}
        modifiersClassNames={{
          daysOff: "text-muted-foreground opacity-70 line-through",
        }}
      />
      <div className="flex flex-wrap gap-2 mt-4">
        {[
          { label: "Today", value: 0 },
          { label: "Tomorrow", value: 1 },
          { label: "In 3 days", value: 3 },
          { label: "In a week", value: 7 },
          { label: "In 2 weeks", value: 14 },
        ].map((preset) => (
          <Button
            key={preset.value}
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              const newDate = addDays(new Date(), preset.value);
              setDate(newDate);
              setCurrentMonth(
                new Date(newDate.getFullYear(), newDate.getMonth(), 1),
              );
            }}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
