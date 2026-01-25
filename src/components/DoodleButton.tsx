import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface DoodleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "lg";
}

const DoodleButton = forwardRef<HTMLButtonElement, DoodleButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative font-display tracking-wide transition-all duration-200 active:translate-x-1 active:translate-y-1 active:shadow-none",
          "doodle-border doodle-shadow",
          "hover:-translate-x-0.5 hover:-translate-y-0.5",
          {
            "bg-primary text-primary-foreground": variant === "primary",
            "bg-secondary text-secondary-foreground": variant === "secondary",
            "bg-transparent text-foreground": variant === "outline",
          },
          {
            "px-6 py-3 text-lg": size === "default",
            "px-8 py-4 text-xl": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DoodleButton.displayName = "DoodleButton";

export default DoodleButton;
