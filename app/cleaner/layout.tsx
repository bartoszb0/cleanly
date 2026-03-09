import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import React from "react";

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
    <ThemeProvider attribute="class" forcedTheme="cleaner">
      <div className="flex flex-col min-h-dvh bg-fixed bg-linear-to-br from-slate-800 via-slate-800 to-green-900">
        <main className="flex flex-col">{children}</main>
      </div>
    </ThemeProvider>
  );
}
