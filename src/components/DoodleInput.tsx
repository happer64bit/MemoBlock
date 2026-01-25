import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type DoodleInputProps = InputHTMLAttributes<HTMLInputElement>

const DoodleInput = forwardRef<HTMLInputElement, DoodleInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-card px-4 py-3 font-body text-lg text-foreground placeholder:text-muted-foreground",
          "doodle-border-thin",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
          "transition-all duration-200",
          className
        )}
        {...props}
      />
    );
  }
);

DoodleInput.displayName = "DoodleInput";

export default DoodleInput;
