import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchCleanerInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedValue = inputValue.trim().toLowerCase();

    const params = new URLSearchParams(searchParams);

    if (sanitizedValue) {
      params.set("search", sanitizedValue);
    } else {
      params.delete("search");
    }

    // reset to page 1 when searching
    params.set("page", "1");

    startTransition(() => {
      router.push(`/customer?${params.toString()}`);
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-row items-center gap-2"
    >
      <Input
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        className="bg-sky-800 border-sky-900 h-12 text-base px-4 md:text-lg w-full max-w-xs md:max-w-md lg:max-w-lg"
        placeholder="Search Cleaner by name"
      />
      <Button className="h-12" disabled={isPending}>
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <SearchIcon className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
}
