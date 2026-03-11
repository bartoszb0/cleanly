import CleanerNavbar from "@/components/cleaner-dashboard/cleaner-navbar";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Cleanly",
  description: "Manage your cleanings",
};

export default function CleanerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" forcedTheme="cleaner">
      <div className="flex flex-col min-h-dvh bg-fixed bg-linear-to-br from-slate-800 via-slate-800 to-green-900">
        <Suspense fallback={null}>
          <CleanerNavbar />
        </Suspense>
        <main className="flex flex-col flex-1 pt-16 md:pt-0 md:ml-64">
          <div className="p-4 md:p-10">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  );
}
