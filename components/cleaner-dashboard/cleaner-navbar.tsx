"use client";

import {
  Briefcase,
  LayoutDashboard,
  MessageCircle,
  Star,
  UserPen,
} from "lucide-react";
import Navbar from "../shared/navbar";

const navLinks = [
  { href: "/cleaner", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cleaner/jobs", label: "My Jobs", icon: Briefcase },
  { href: "/cleaner/messages", label: "Messages", icon: MessageCircle },
  { href: "/cleaner/reviews", label: "Reviews", icon: Star },
  { href: "/cleaner/profile", label: "Edit profile", icon: UserPen },
];

export default function CleanerNavbar() {
  return <Navbar navLinks={navLinks} />;
}
