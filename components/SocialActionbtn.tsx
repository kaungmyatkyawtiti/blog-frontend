import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SocialActionBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  count: number;
  className?: string;
}

const SocialActionBtn = ({
  icon,
  count,
  className,
  ...props
}: SocialActionBtnProps) => (
  <button
    className={cn(
      "flex items-center gap-3 text-foreground/70",
      className
    )}
    {...props}
  >
    <span className="hover:scale-110 hover-effect">{icon}</span>
    <span className="text-[14px] font-medium hidden sm:block">{count}</span>
  </button>
);

export default SocialActionBtn;
