import React from "react";
import { Button } from "./button";
import { cn } from "@/utils/cn";

export type DialogProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  showClose?: boolean;
};

export function Dialog({
  title,
  isOpen,
  onClose,
  children,
  footer,
  className,
  showClose = true,
}: DialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        <div className="mt-4">{children}</div>
        <div className="mt-6 flex justify-end space-x-2">
          {footer || (showClose && <Button onClick={onClose}>Close</Button>)}
        </div>
      </div>
    </div>
  );
}
