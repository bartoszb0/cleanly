import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  filterSchema,
  FilterValues,
  SuppliesOptions,
} from "@/lib/schemas/filterCleaners";
import { cn, parseUrlDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, StarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

const getFiltersFromParams = (params: URLSearchParams) => ({
  priceRange: [
    Math.max(0, Number(params.get("minPrice")) || 0),
    Math.min(300, Number(params.get("maxPrice")) || 300),
  ] as [number, number],
  minRating: Number(params.get("rating")) || 0,
  minJobs: Number(params.get("jobs")) || 0,
  suppliesProvided: (params.get("supplies") as SuppliesOptions) || "all",
  date: parseUrlDate(params.get("date")),
});

export default function FilterCleanersDialog() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  const { control, handleSubmit, reset } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: getFiltersFromParams(searchParams),
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSearch = (formData: FilterValues) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      if (formData.priceRange[0] > 0) {
        params.set("minPrice", formData.priceRange[0].toString());
      } else {
        params.delete("minPrice");
      }

      if (formData.priceRange[1] < 300) {
        params.set("maxPrice", formData.priceRange[1].toString());
      } else {
        params.delete("maxPrice");
      }

      if (formData.minRating && formData.minRating > 0) {
        params.set("rating", formData.minRating.toString());
      } else {
        params.delete("rating");
      }

      if (formData.minJobs && formData.minJobs > 0) {
        params.set("jobs", formData.minJobs.toString());
      } else {
        params.delete("jobs");
      }

      if (formData.suppliesProvided === "true") {
        params.set("supplies", "true");
      } else if (formData.suppliesProvided === "false") {
        params.set("supplies", "false");
      } else {
        params.delete("supplies");
      }

      if (formData.date) {
        const dateString = format(formData.date, "yyyy-MM-dd");
        params.set("date", dateString);
      } else {
        params.delete("date");
      }

      params.set("page", "1");

      router.push(`/customer?${params.toString()}`);
      setOpen(false);
    });
  };

  const handleDeepReset = () => {
    // Clear the form state
    reset({
      priceRange: [0, 300],
      minRating: 0,
      minJobs: 0,
      suppliesProvided: "all",
      date: null,
    });

    // Clear the URL immediately
    const params = new URLSearchParams(searchParams);
    ["minPrice", "maxPrice", "rating", "jobs", "supplies", "date"].forEach(
      (p) => params.delete(p),
    );
    router.push(`/customer?${params.toString()}`);
  };

  // Sync UI with searchPrams whenever user goes back to previous page, changes URL
  useEffect(() => {
    reset(getFiltersFromParams(searchParams));
  }, [searchParams, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Filters</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSearch)}>
          <fieldset className="flex flex-col p-4 gap-8" disabled={isPending}>
            {/* Price range slider */}
            <Controller
              name="priceRange"
              control={control}
              render={({ field }) => (
                <Field>
                  <div className="flex items-center justify-between mb-2">
                    <FieldLabel htmlFor="priceRange">Price range</FieldLabel>
                    <span className="text-md font-medium text-foreground">
                      {field.value?.[0] ?? 0} PLN – {field.value?.[1] ?? 300}{" "}
                      PLN
                    </span>
                  </div>

                  <Slider
                    id="priceRange"
                    value={field.value}
                    onValueChange={field.onChange}
                    min={0}
                    max={300}
                    step={5}
                    className="w-full"
                    disabled={isPending}
                  />

                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-slate-500 font-medium">
                      0 PLN
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      300 PLN
                    </span>
                  </div>
                </Field>
              )}
            />

            {/* Minimal rating */}
            <Controller
              name="minRating"
              control={control}
              render={({ field }) => (
                <Field>
                  <div className="flex items-center justify-between mb-2">
                    <FieldLabel>Average rating</FieldLabel>
                    <span
                      className={cn(
                        "text-md text-foreground",
                        (field.value ?? 0) > 0 ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {field.value || 0}
                      {field.value !== 0 && field.value !== 5 && "+"}
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          field.onChange(field.value === star ? 0 : star)
                        }
                        className="focus:outline-none transition-transform active:scale-90"
                      >
                        <StarIcon
                          size={32}
                          className={cn(
                            star <= (field.value ?? 0)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-slate-600",
                            isPending && "opacity-40 grayscale-[0.5] scale-95",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </Field>
              )}
            />

            {/* Completed jobs selection */}
            <Controller
              name="minJobs"
              control={control}
              render={({ field }) => (
                <Field>
                  <div className="flex items-center justify-between mb-2">
                    <FieldLabel>Completed Jobs</FieldLabel>
                    <span
                      className={cn(
                        "text-md text-foreground",
                        (field.value ?? 0) > 0 ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {field.value}+ jobs
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {[10, 50, 100, 200].map((amount) => {
                      const isSelected = field.value === amount;
                      return (
                        <button
                          key={amount}
                          type="button"
                          onClick={() =>
                            field.onChange(isSelected ? 0 : amount)
                          }
                          className={cn(
                            "px-3 py-1.5 rounded-full text-md font-semibold border",
                            isSelected
                              ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20"
                              : "bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500",
                            isPending &&
                              (isSelected
                                ? "opacity-70 saturate-[0.7] cursor-not-allowed"
                                : "opacity-40 grayscale cursor-not-allowed"),
                          )}
                        >
                          {amount}+
                        </button>
                      );
                    })}
                  </div>
                </Field>
              )}
            />

            {/* Supplies provided selection */}
            <Controller
              name="suppliesProvided"
              control={control}
              render={({ field }) => (
                <Field className="flex flex-col gap-3">
                  <FieldLabel>Supplies</FieldLabel>
                  <div className="grid grid-cols-3 bg-slate-700 gap-2 p-1 rounded-lg border border-slate-800">
                    {[
                      { label: "All", value: "all" },
                      { label: "Provided", value: "true" },
                      { label: "Not provided", value: "false" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => field.onChange(opt.value)}
                        className={cn(
                          "py-1.5 text-xs font-medium rounded-md transition-all",
                          field.value === opt.value
                            ? "bg-sky-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-slate-200",
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </Field>
              )}
            />

            {/* Date Picker */}
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Available on</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-slate-900/50 border-slate-700 h-11",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              <Button type="button" variant="outline" onClick={handleDeepReset}>
                Reset
              </Button>
              <Button type="submit">
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Apply filters"
                )}
              </Button>
            </div>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
}
