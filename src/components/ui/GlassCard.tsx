
import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "light" | "dark";
  hoverEffect?: boolean;
  intensity?: "low" | "medium" | "high";
  children: React.ReactNode;
}

export const GlassCard = ({
  className,
  variant = "default",
  hoverEffect = true,
  intensity = "medium",
  children,
  ...props
}: GlassCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "light":
        return "bg-white/70 border-white/30 text-token-dark";
      case "dark":
        return "bg-token-dark/70 border-token-dark/30 text-white";
      default:
        return "bg-white/10 border-white/20 text-foreground";
    }
  };

  const getIntensityClasses = () => {
    switch (intensity) {
      case "low":
        return "backdrop-blur-sm";
      case "high":
        return "backdrop-blur-xl";
      default:
        return "backdrop-blur-lg";
    }
  };

  const getHoverClasses = () => {
    return hoverEffect
      ? "transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      : "";
  };

  return (
    <div
      className={cn(
        "rounded-2xl border shadow-sm",
        getVariantClasses(),
        getIntensityClasses(),
        getHoverClasses(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
