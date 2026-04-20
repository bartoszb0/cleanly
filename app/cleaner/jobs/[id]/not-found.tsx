import NotFoundPage from "@/components/not-found-page";

export default function JobNotFound() {
  return (
    <NotFoundPage
      title="Job not found"
      message="This job doesn't exist or you don't have access to it."
      href="/cleaner/jobs"
      linkLabel="Back to jobs"
    />
  );
}
