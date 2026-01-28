"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { finishCleanerOnboarding } from "@/lib/actions/onboarding";
import { POLISH_CITIES } from "@/lib/constants/cities";
import { CleanerFormValues, CleanerSchema } from "@/lib/schemas/cleanerForm";
import { formatPhoneNumber } from "@/lib/utils/formatPhoneNumber";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { OnboardingWrapper } from "../../../components/onboarding/onboarding-wrapper";

export default function CleanerForm() {
  const { control, handleSubmit } = useForm<CleanerFormValues>({
    resolver: zodResolver(CleanerSchema),
    defaultValues: {
      name: "",
      bio: "",
      city: "",
      phone: "",
      experience: "",
      hourly_rate: undefined,
      supplies_provided: false,
    },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: CleanerFormValues) => {
    startTransition(async () => {
      const result = await finishCleanerOnboarding(data);

      if (result.error) {
        toast.error(result.error);
      } else {
        router.push("/cleaner");
        toast.success("Customer account set up succesfully");
      }
    });
  };

  return (
    <OnboardingWrapper
      description="Fill out your information to set up your profile"
      variant="cleaner"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="onboarding-form">
        <fieldset className="flex flex-col gap-4" disabled={isPending}>
          {/* Name */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Full Name / Company Name
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Jan Kowalski"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Bio */}
          <Controller
            name="bio"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>About me</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Describe your experience"
                  autoComplete="off"
                  rows={7}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Avatar TODO */}
          <Field>
            <label>avatar</label>
            <Input placeholder="avatar" />
          </Field>

          {/* Experience Years */}
          <Controller
            name="experience"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Experience in years
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  value={field.value != null ? String(field.value) : ""}
                  type="number"
                  aria-invalid={fieldState.invalid}
                  placeholder="5"
                  autoComplete="off"
                  min={0}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Hourly Rate */}
          <Controller
            name="hourly_rate"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Hourly rate</FieldLabel>
                <div className="flex flex-row gap-2">
                  <span className="flex items-center justify-center w-20 bg-slate-800 border border-slate-700 px-3 rounded-md text-slate-400">
                    PLN
                  </span>
                  <Input
                    {...field}
                    id={field.name}
                    value={field.value != null ? String(field.value) : ""}
                    type="number"
                    step="0.01"
                    aria-invalid={fieldState.invalid}
                    placeholder="35.00"
                    autoComplete="off"
                    min={1}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* City select */}
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>City</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectValue placeholder="Choose city" />
                  </SelectTrigger>
                  <SelectContent className="onboarding-dropdown">
                    {POLISH_CITIES.map((city) => (
                      <SelectItem value={city.value} key={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
                <div className="flex flex-row gap-2">
                  <span className="flex items-center justify-center w-20 bg-slate-800 border border-slate-700 px-3 rounded-md text-slate-400">
                    +48
                  </span>
                  <Input
                    {...field}
                    id={field.name}
                    type="tel"
                    placeholder="123 456 789"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                  />
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Supplies provided checkbox */}
          <Controller
            name="supplies_provided"
            control={control}
            render={({ field }) => (
              <Field orientation="horizontal" className="gap-3 py-2">
                <Checkbox
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldContent>
                  <FieldLabel
                    htmlFor={field.name}
                    className="cursor-pointer text-base font-medium leading-none"
                  >
                    I provide my own supplies
                  </FieldLabel>
                  <FieldDescription>
                    Check this if you bring your own vacuum, mop, and cleaning
                    chemicals. If unchecked, the customer must provide all
                    necessary tools.
                  </FieldDescription>
                </FieldContent>
              </Field>
            )}
          />

          <Button type="submit">Submit</Button>
        </fieldset>
      </form>
    </OnboardingWrapper>
  );
}
