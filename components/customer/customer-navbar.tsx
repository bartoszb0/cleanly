"use client";
import { Bubbles, History, MessageCircle } from "lucide-react";
import Navbar from "../shared/navbar";

const navLinks = [
  { href: "/customer", label: "Find Cleaners", icon: Bubbles },
  { href: "/customer/messages", label: "Messages", icon: MessageCircle },
  { href: "/customer/my-bookings", label: "My Bookings", icon: History },
];

export default function CustomerNavbar() {
  return <Navbar navLinks={navLinks} />;
}
