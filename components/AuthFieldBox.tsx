import { cn } from "@/lib/utils";
import { ReactNode } from "react"

interface AuthFieldBoxProps {
  children: ReactNode;
  className?: string;
  error?: string;
}

export default function AuthFieldBox({
  children,
  className,
  error,
}: AuthFieldBoxProps) {
  return (
    <div
      className={cn(
        "space-y-2",
        className
      )}
    >
      <div
        className="flex items-center bg-card border border-border h-15 rounded-full overflow-hidden gap-2 px-4 focus:border-social-indigo"
      >
        {children}
      </div>

      {
        error &&
        <span className="text-sm text-destructive font-medium ml-5">
          {error}
        </span>
      }
    </div>
  )
}
