"use client";

import { Bubbles, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { finishOnboarding } from "../actions/onboarding";

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] = useState<UserProfileRole | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = () => {
    if (!selectedRole) return;

    startTransition(async () => {
      const result = await finishOnboarding(selectedRole);
      if (result.error) {
        toast.error(result.error);
      } else {
        router.replace(`/onboarding/${selectedRole}`);
      }
    });
  };

  // Define the background variants
  const backgrounds = {
    default: "from-sky-900 via-slate-800 to-green-900",
    customer: "from-sky-900 via-slate-800 to-slate-800", // Shifted to deeper blue/slate
    cleaner: "from-slate-800 via-slate-800 to-green-900", // Shifted to deeper slate/green
  };

  // Determine which gradient to use
  const currentBg = selectedRole
    ? backgrounds[selectedRole]
    : backgrounds.default;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentBg} transition-colors duration-700 ease-in-out flex items-center justify-center p-4`}
    >
      <div className="max-w-4xl w-full my-10 p-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Setup your account
          </h1>
          <p className="text-xl text-slate-400">
            Choose how you'd like to use our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Customer Card */}
          <button
            onClick={() => setSelectedRole("customer")}
            className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
              selectedRole === "customer"
                ? "border-sky-500 bg-sky-500/10 shadow-xl shadow-sky-500/20 scale-105"
                : "border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all ${
                  selectedRole === "customer"
                    ? "bg-sky-600 shadow-lg shadow-sky-600"
                    : "bg-slate-700 group-hover:bg-slate-600"
                }`}
              >
                <User className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                I'm a Customer
              </h2>

              <p className="text-slate-400 mb-6">
                Book professional cleaning services for your home
              </p>

              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  Browse available cleaners
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  Schedule appointments
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  Manage bookings
                </li>
              </ul>
            </div>

            {selectedRole === "customer" && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            )}
          </button>

          {/* Cleaner Card */}
          <button
            onClick={() => setSelectedRole("cleaner")}
            className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
              selectedRole === "cleaner"
                ? "border-green-500 bg-green-500/10 shadow-xl shadow-green-500/20 scale-105"
                : "border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800"
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all ${
                  selectedRole === "cleaner"
                    ? "bg-green-500 shadow-lg shadow-green-500/50"
                    : "bg-slate-700 group-hover:bg-slate-600"
                }`}
              >
                <Bubbles className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                I'm a Cleaner
              </h2>

              <p className="text-slate-400 mb-6">
                Offer your cleaning services and connect with customers
              </p>

              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Create your profile
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Set your availability
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Accept bookings
                </li>
              </ul>
            </div>

            {selectedRole === "cleaner" && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            )}
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={!selectedRole || isPending}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              selectedRole
                ? "bg-gradient-to-r from-sky-600 to-green-600 text-white hover:shadow-xl hover:scale-105 active:scale-95"
                : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }`}
          >
            {isPending ? "Setting up..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
