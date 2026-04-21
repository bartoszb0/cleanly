"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
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

  return (
    <Card className="mt-5 text-center">
      <CardHeader>
        <CardTitle>Test the app without registering</CardTitle>
        <CardDescription>Choose which side to demo view</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() =>
              startCustomerTransition(() => loginDemoCustomer(router))
            }
            disabled={isCustomerDemoPending || isCleanerDemoPending}
          >
            {isCustomerDemoPending ? "Logging in..." : "Customer View"}
          </Button>
          <Button
            onClick={() =>
              startCleanerTransition(() => loginDemoCleaner(router))
            }
            disabled={isCleanerDemoPending || isCustomerDemoPending}
          >
            {isCleanerDemoPending ? "Logging in..." : "Cleaner View"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
