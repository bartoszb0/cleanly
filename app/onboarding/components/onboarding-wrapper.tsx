// components/onboarding/OnboardingWrapper.tsx
import { ReactNode } from "react";

interface OnboardingWrapperProps {
  children: ReactNode;
  description: string;
  variant: "customer" | "cleaner";
}

export function OnboardingWrapper({
  children,
  description,
  variant,
}: OnboardingWrapperProps) {
  const backgrounds = {
    customer: "from-sky-900 via-slate-800 to-slate-800",
    cleaner: "from-slate-800 via-slate-800 to-green-900",
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${backgrounds[variant]} transition-colors duration-700 flex justify-center p-10`}
    >
      <div className="bg-slate-800/60 backdrop-blur-md border-slate-700 border-2 h-full w-full rounded-3xl p-10 my-6 max-w-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">One more step!</h1>
          <p className="text-lg text-slate-400">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
