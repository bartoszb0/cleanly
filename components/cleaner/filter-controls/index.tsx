import FilterCleanersDialog from "./filter-dialog";
import SearchCleanerInput from "./search-input";
import SortCleanersSelect from "./sort-select";

export default function FilterControls() {
  return (
    <div className="flex flex-col items-center gap-3 mt-5">
      <SearchCleanerInput />
      <div className="flex flex-row gap-2">
        <SortCleanersSelect />
        <FilterCleanersDialog />
      </div>
    </div>
  );
}
