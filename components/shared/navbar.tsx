"use client";

import { LogoutButton } from "@/components/ui/logout-button";
import { cn } from "@/lib/utils";
import { NavbarProps } from "@/types";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar({ navLinks }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-card/50 border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                C
              </span>
            </div>
            <span className="text-foreground font-semibold text-xl">
              Cleanly
            </span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col backdrop-blur-md bg-card/50 border-r border-border">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                C
              </span>
            </div>
            <span className="text-foreground font-semibold text-xl">
              Cleanly
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 font-medium",
                  pathname === link.href
                    ? "bg-primary/15 text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/10",
                )}
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-card/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <aside className="md:hidden fixed left-0 top-16 bottom-0 w-full z-50 bg-card/70 backdrop-blur-lg ">
            <nav className="px-4 py-6 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 font-medium",
                      pathname === link.href
                        ? "bg-primary/15 text-white"
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/10",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-border">
              <LogoutButton />
            </div>
          </aside>
        </>
      )}
    </>
  );
}
