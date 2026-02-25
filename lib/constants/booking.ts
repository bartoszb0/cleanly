export const VALID_HOURS = Array.from({ length: 14 }, (_, i) =>
  (i + 7).toString(),
);
export const VALID_MINUTES = ["00", "15", "30", "45"];
export const VALID_DURATIONS = ["1", "2", "3", "4", "5", "6"];

export const BOOKING_STATUS = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];
