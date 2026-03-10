import CustomerNavbar from "@/components/customer/customer-navbar";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cleanly",
  description: "Book a cleaning instantly",
};

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" forcedTheme="customer">
      <div className="flex flex-col min-h-dvh bg-fixed bg-linear-to-br from-sky-900 via-slate-800 to-slate-800">
        <Suspense fallback={null}>
          <CustomerNavbar />
        </Suspense>
        <main className="flex flex-col flex-1 pt-16 md:pt-0 md:ml-64">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
