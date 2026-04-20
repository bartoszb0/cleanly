import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage({
  title = "Page not found",
  message = "The page you're looking for doesn't exist or has been moved.",
  href,
  linkLabel = "Go back",
}: {
  title?: string;
  message?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 p-6 text-center">
      <h1 className="text-8xl font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-muted-foreground mb-8 max-w-md">{message}</p>
      {href && (
        <Button asChild>
          <Link href={href}>{linkLabel}</Link>
        </Button>
      )}
    </div>
  );
}
