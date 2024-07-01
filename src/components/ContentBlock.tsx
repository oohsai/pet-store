import { cn } from "@/lib/utils";
import React from "react";

type CBProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ContentBlock({ children, className }: CBProps) {
  return (
    <div
      className={cn(
        "bg-[#f7f8fa] shadow-sm rounded-md overflow-hidden h-full w-full",
        className
      )}
    >
      {children}
    </div>
  );
}
