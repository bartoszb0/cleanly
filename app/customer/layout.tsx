import { Metadata } from "next";
import React from "react";
import Navbar from "../../components/customer/navbar";

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
    <div className="flex flex-col min-h-dvh">
      <Navbar />
      <main className="flex flex-col flex-1 pt-16 md:pt-0 md:ml-64">
        {children}
      </main>
    </div>
  );
}
