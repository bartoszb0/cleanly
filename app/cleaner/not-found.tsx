import NotFoundPage from "@/components/not-found-page";

export default function NotFound() {
  return (
    <NotFoundPage
      title="Page not found"
      message="The page you're looking for doesn't exist or has been moved."
      href="/cleaner"
      linkLabel="Go to dashboard"
    />
  );
}
