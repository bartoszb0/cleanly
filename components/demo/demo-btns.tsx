"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { loginDemoCleaner, loginDemoCustomer } from "./demo";

export default function DemoButtons() {
  const router = useRouter();

  const [isCustomerDemoPending, startCustomerTransition] = useTransition();
  const [isCleanerDemoPending, startCleanerTransition] = useTransition();

  const handleCustomerLogin = () => {
    startCustomerTransition(async () => {
      const result = await loginDemoCustomer();
      if (result.success) router.push("/customer");
      else toast.error(result.message);
    });
  };

  const handleCleanerLogin = () => {
    startCleanerTransition(async () => {
      const result = await loginDemoCleaner();
      if (result.success) router.push("/cleaner");
      else toast.error(result.message);
    });
  };

  return (
    <Card className="mt-5 text-center">
      <CardHeader>
        <CardTitle>Test the app without registering</CardTitle>
        <CardDescription>Choose which side to demo view</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleCustomerLogin}
            disabled={isCustomerDemoPending || isCleanerDemoPending}
          >
            {isCustomerDemoPending ? "Logging in..." : "Customer View"}
          </Button>
          <Button
            onClick={handleCleanerLogin}
            disabled={isCleanerDemoPending || isCustomerDemoPending}
          >
            {isCleanerDemoPending ? "Logging in..." : "Cleaner View"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
