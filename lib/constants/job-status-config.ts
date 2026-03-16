import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export const JOB_STATUS_CONFIG = {
  upcoming: {
    label: "Upcoming",
    icon: Loader2,
    classes: "bg-primary/10 text-primary border-primary/20",
    dot: "bg-primary",
  },
  in_progress: {
    label: "In Progress",
    icon: Loader2,
    classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400 animate-pulse",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    classes: "bg-emerald-500/10 text-emerald-400/40 border-emerald-500/20",
    dot: "bg-emerald-400/40",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    classes: "bg-destructive/10 text-destructive border-destructive/20",
    dot: "bg-destructive",
  },
};
