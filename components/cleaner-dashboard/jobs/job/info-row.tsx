export default function InfoRow({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground flex items-center gap-2.5">
        <Icon size={15} className="shrink-0" />
        {label}
      </span>
      <span
        className={`text-sm font-semibold ${highlight ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}
