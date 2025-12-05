import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export default function Container({
  className,
  children,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto px-4",
        className
      )}
    >
      {children}
    </div>
  )
}
