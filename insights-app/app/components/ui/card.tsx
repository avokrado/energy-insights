import React from "react";
import { cn } from "@/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className, title }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-gray-200 flex flex-col justify-center items-center p-6 shadow-lg rounded-lg",
        className
      )}
    >
      {title && <h2 className="text-2xl text-center">{title}</h2>}
      {children}
    </div>
  );
}
