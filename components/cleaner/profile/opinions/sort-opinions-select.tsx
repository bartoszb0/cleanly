import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OpinionSortOption } from "@/types";

type SortOpinionsSelectBtnProps = {
  sortBy: OpinionSortOption;
  handleSortChange: (newSort: OpinionSortOption) => void;
};

export default function SortOpinionsSelectBtn({
  sortBy,
  handleSortChange,
}: SortOpinionsSelectBtnProps) {
  return (
    <Select
      value={sortBy}
      onValueChange={(value: OpinionSortOption) => handleSortChange(value)}
    >
      <SelectTrigger className="w-[180px] h-12 text-lg text-slate-200 focus:ring-sky-500">
        <SelectValue placeholder="Sort by" className="bg-slate-800" />
      </SelectTrigger>
      <SelectContent className="bg-slate-800">
        <SelectGroup>
          <SelectLabel className="text-base px-3 py-2">Sort by</SelectLabel>
          <SelectItem value="newest" className="text-base py-3">
            Newest
          </SelectItem>
          <SelectItem value="oldest" className="text-base py-3">
            Oldest
          </SelectItem>
          <SelectItem value="highest" className="text-base py-3">
            Highest Rated
          </SelectItem>
          <SelectItem value="lowest" className="text-base py-3">
            Lowest Rated
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
