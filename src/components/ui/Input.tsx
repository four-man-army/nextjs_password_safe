import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            {
              "ring-red-500 outline-none ring-2":
                error !== undefined,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {error !== undefined ? (
          <p className="text-red-500 text-xs absolute -top-6">{error}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
