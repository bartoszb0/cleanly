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
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-slate-800 to-slate-800 transition-colors duration-700">
      <Navbar />
      <main className="pt-16 md:pt-0 md:ml-64">{children}</main>
    </div>
  );
}
