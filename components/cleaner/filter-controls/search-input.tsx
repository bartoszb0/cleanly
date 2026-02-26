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
    <form onSubmit={(e) => handleSubmit(e)} className="flex items-center">
      <div className="relative flex items-center">
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          className="bg-sky-900/40 border-sky-800/60 hover:border-sky-700 focus-visible:border-sky-600 h-12 pl-4 pr-12 w-70 md:w-105 lg:w-140 rounded-xl text-slate-200 placeholder:text-slate-500 text-base md:text-lg"
          placeholder="Search cleaner by name..."
        />
        <button
          type="submit"
          className="absolute right-3 text-slate-400 hover:text-sky-400 transition-colors disabled:opacity-50 cursor-pointer"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SearchIcon className="h-4 w-4" />
          )}
        </button>
      </div>
    </form>
  );
}
