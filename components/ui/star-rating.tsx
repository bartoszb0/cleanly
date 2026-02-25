// components/ui/star-rating.tsx
"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
  disabled?: boolean;
}

export function StarRating({
  value,
  onChange,
  size = 32,
  disabled = false,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  return (
    <div
      className="flex items-center gap-1"
      onMouseLeave={() => !disabled && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => onChange(value === star ? 0 : star)}
          onMouseEnter={() => !disabled && setHovered(star)}
          className={cn(
            "transition-transform duration-100 focus:outline-none",
            !disabled && "hover:scale-110 active:scale-95",
          )}
        >
          <Star
            size={size}
            className={cn(
              "transition-colors duration-100",
              star <= (hovered || value)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-700 text-slate-700",
              disabled && "opacity-50 cursor-not-allowed",
            )}
          />
        </button>
      ))}
    </div>
  );
}
