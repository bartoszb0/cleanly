"use client";

import { LogoutButton } from "@/components/ui/logout-button";
import { Bubbles, History, Info, Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/customer", label: "Find Cleaners", icon: Bubbles },
    { href: "/customer/messages", label: "Messages", icon: MessageCircle },
    { href: "/customer/history", label: "History", icon: History },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/30 border-b border-white/10">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-white font-semibold text-xl">Cleanly</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col backdrop-blur-md bg-slate-900/30 border-r border-white/10">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-white font-semibold text-xl">Cleanly</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-3 text-slate-200 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors duration-200 font-medium"
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <aside className="md:hidden fixed left-0 top-16 bottom-0 w-full z-50 backdrop-blur-lg ">
            <nav className="px-4 py-6 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-3 text-slate-200 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-colors duration-200 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2">
              <LogoutButton />
            </div>
          </aside>
        </>
      )}
    </>
  );
}
