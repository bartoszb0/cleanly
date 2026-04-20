"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updateCleanerProfile } from "@/lib/actions/cleaners";
import { POLISH_CITIES } from "@/lib/constants/cities";
import { CleanerFormValues, CleanerSchema } from "@/lib/schemas/cleanerForm";
import { Tables } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfileForm({
  cleaner,
}: {
  cleaner: Tables<"cleaners">;
}) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CleanerFormValues>({
    resolver: zodResolver(CleanerSchema),
    defaultValues: {
      name: cleaner.name,
      bio: cleaner.bio,
      hourly_rate: cleaner.hourly_rate,
      city: cleaner.city,
      phone: cleaner.phone,
      supplies_provided: cleaner.supplies_provided ?? false,
    },
  });

  const onSubmit = (values: CleanerFormValues) => {
    startTransition(async () => {
      const result = await updateCleanerProfile(values);
      if (result.success) {
        toast.success("Profile updated");
      } else {
        toast.error(result.error ?? "Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isPending}>
        <div className="bg-card border border-border rounded-2xl p-6 mb-4">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
            Edit Profile
          </h2>

          <div className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={4}
                className="resize-none"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-xs text-destructive">{errors.bio.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* City */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="city">City</Label>
                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="city" className="w-full">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {POLISH_CITIES.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.city && (
                  <p className="text-xs text-destructive">
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="123 456 789"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Hourly rate */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="hourly_rate">Hourly rate (PLN)</Label>
                <Input
                  id="hourly_rate"
                  type="number"
                  step="0.01"
                  min={0.01}
                  {...register("hourly_rate")}
                />
                {errors.hourly_rate && (
                  <p className="text-xs text-destructive">
                    {errors.hourly_rate.message as string}
                  </p>
                )}
              </div>

              {/* Supplies */}
              <div className="flex flex-col gap-1.5">
                <Label>Cleaning supplies</Label>
                <div className="flex items-center gap-3 h-9">
                  <Controller
                    control={control}
                    name="supplies_provided"
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <span className="text-sm text-muted-foreground">
                    I provide cleaning supplies
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={!isDirty || isPending}>
            {isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
