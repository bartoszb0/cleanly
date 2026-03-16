import { LayoutDashboard } from "lucide-react";

export default function DashboardHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-9">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <LayoutDashboard className="text-primary" size={22} />
          Cleaner Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Browse your jobs and informations
        </p>
      </div>
      {children}
    </div>
  );
}
