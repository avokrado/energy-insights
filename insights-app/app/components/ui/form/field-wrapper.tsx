import * as React from "react";
import { Label } from "./label";
import { Error } from "./error";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: string | null;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FieldWrapper = ({ label, error, children }: FieldWrapperProps) => (
  <div>
    <Label>
      {label}
      <div className="mt-1">{children}</div>
    </Label>
    <Error errorMessage={error} />
  </div>
);
