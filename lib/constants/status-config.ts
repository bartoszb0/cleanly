export const BOOKING_STATUS_CONFIG: Record<
  string,
  { label: string; className: string; accent: string; dot: string }
> = {
  pending: {
    label: "Pending Approval",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    accent: "from-amber-500/0 via-amber-500/50 to-amber-500/0",
    dot: "bg-amber-400",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-sky-500/10 text-sky-400 border-sky-500/25",
    accent: "from-sky-500/0 via-sky-500/50 to-sky-500/0",
    dot: "bg-sky-400",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    accent: "from-emerald-500/0 via-emerald-500/50 to-emerald-500/0",
    dot: "bg-emerald-400",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-500/10 text-red-400 border-red-500/25",
    accent: "from-red-500/0 via-red-500/50 to-red-500/0",
    dot: "bg-red-400",
  },
  expired: {
    label: "Expired",
    className: "bg-slate-500/10 text-slate-400 border-slate-500/25",
    accent: "from-slate-500/0 via-slate-500/50 to-slate-500/0",
    dot: "bg-slate-400",
  },
};
