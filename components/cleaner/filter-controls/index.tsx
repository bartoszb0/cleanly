"use client";

import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import FilterCleanersDialog from "./filter-dialog";
import SearchCleanerInput from "./search-input";
import SortCleanersSelect from "./sort-select";

export default function FilterControls() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <div className="flex flex-row items-center gap-2">
        <SearchCleanerInput />
        <Button
          className={`h-12 transition-colors ${open ? "bg-sky-700" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <SlidersHorizontal />
        </Button>
      </div>

      <div
        className={`
      overflow-hidden transition-all duration-300 ease-in-out
      ${open ? "max-h-24 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}
    `}
      >
        <div className="flex flex-row items-center justify-center gap-2">
          <SortCleanersSelect />
          <FilterCleanersDialog />
        </div>
      </div>
    </div>
  );
}
