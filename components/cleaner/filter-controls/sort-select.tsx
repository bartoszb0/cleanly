import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CleanersSortOption } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function SortCleanersSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("rating");
  const [isPending, startTransition] = useTransition();

  const handleSortChange = (value: CleanersSortOption) => {
    setSortBy(value);

    const params = new URLSearchParams(searchParams);

    params.set("sort", value);

    // reset to page 1 when searching
    params.set("page", "1");

    startTransition(() => {
      router.push(`/customer?${params.toString()}`);
    });
  };

  return (
    <Select
      value={sortBy}
      onValueChange={(value: CleanersSortOption) => handleSortChange(value)}
      disabled={isPending}
    >
      <SelectTrigger className="w-45 h-12  bg-sky-600 hover:bg-sky-700 text-white border-none rounded-lg font-medium transition-colors">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent className="bg-slate-800">
        <SelectGroup>
          <SelectLabel className="text-base px-3 py-2">Sort by</SelectLabel>
          <SelectItem value="rating" className="text-base py-3">
            Best rated
          </SelectItem>
          <SelectItem value="highest_price" className="text-base py-3">
            Highest price
          </SelectItem>
          <SelectItem value="lowest_price" className="text-base py-3">
            Lowest price
          </SelectItem>
          <SelectItem value="experience" className="text-base py-3">
            Experience
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
