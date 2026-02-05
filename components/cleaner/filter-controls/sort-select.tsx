import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function SortCleanersSelect() {
  const [sortBy, setSortBy] = useState("rating");

  const handleSortChange = (value: any) => {
    setSortBy(value);
  };

  return (
    <Select
      value={sortBy}
      onValueChange={(value: any) => handleSortChange(value)}
    >
      <SelectTrigger className="w-[180px] h-12  bg-sky-600 hover:bg-sky-700 text-white border-none rounded-lg font-medium transition-colors">
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
