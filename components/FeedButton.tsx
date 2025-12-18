import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  children: ReactNode;
}

export default function FeedButton({
  isActive,
  children,
  ...props
}: FeedButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-1.5 text-sm font-medium rounded-md hover-effect",
        isActive
          ? "bg-social-indigo text-white shadow"
          : "text-muted-foreground hover:text-foreground"
      )}
      {...props}
    >
      {children}
    </button>
  )
}
