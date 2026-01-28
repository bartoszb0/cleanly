"use client";

import { finishCustomerOnboarding } from "@/app/actions/onboarding";
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
import { POLISH_CITIES } from "@/lib/constants/cities";
import { CustomerFormValues, CustomerSchema } from "@/lib/schemas/customerForm";
import { formatPhoneNumber } from "@/lib/utils/formatPhoneNumber";
import { formatPostCode } from "@/lib/utils/formatPostCode";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { OnboardingWrapper } from "../../../components/onboarding/onboarding-wrapper";

export default function CustomerForm() {
  const { control, handleSubmit } = useForm<CustomerFormValues>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      fullName: "",
      city: "",
      address: "",
      postCode: "",
      phone: "",
      hasPets: false,
    },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: CustomerFormValues) => {
    startTransition(async () => {
      const result = await finishCustomerOnboarding(data);

      if (result.error) {
        toast.error(result.error);
      } else {
        router.push("/customer");
        toast.success("Customer account set up succesfully");
      }
    });
  };

  return (
    <OnboardingWrapper
      description="Fill out your information to order your first cleaning"
      variant="customer"
    >
      <form className="onboarding-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col gap-4" disabled={isPending}>
          {/* Full name */}
          <Controller
            name="fullName"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
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

          {/* Post code */}
          <Controller
            name="postCode"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Post code</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="00-001"
                  onChange={(e) => {
                    const formatted = formatPostCode(e.target.value);
                    field.onChange(formatted);
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Address */}
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Kopernika 6/7"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Phone number */}
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

          {/* Pets */}
          <Controller
            name="hasPets"
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
                    I have pets at home
                  </FieldLabel>
                  <FieldDescription>
                    This helps potential cleaners prepare for allergens and
                    allocate the extra time needed for pet hair before they
                    accept your booking.
                  </FieldDescription>
                </FieldContent>
              </Field>
            )}
          />

          <Button type="submit" className="mt-4">
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </fieldset>
      </form>
    </OnboardingWrapper>
  );
}
