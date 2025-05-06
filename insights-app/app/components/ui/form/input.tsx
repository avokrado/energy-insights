import * as React from "react";
import { cn } from "@/utils/cn";
import { FieldWrapper } from "./field-wrapper";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => (
    <FieldWrapper label={label} error={error}>
      <input
        className={cn(
          "h-9 w-full rounded-md border px-3 py-1 text-sm disabled:opacity-50",
          error && "border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    </FieldWrapper>
  )
);

Input.displayName = "Input";

export { Input };
