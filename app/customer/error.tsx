"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">
        Something went wrong!
      </h2>

      <p className="text-slate-400 mb-8 max-w-md">
        {error.message ||
          "An unexpected error occurred while fetching the data."}
      </p>

      <Button
        onClick={() => reset()}
        variant="default"
        className="bg-primary hover:bg-primary/90"
      >
        Try again
      </Button>
    </div>
  );
}
