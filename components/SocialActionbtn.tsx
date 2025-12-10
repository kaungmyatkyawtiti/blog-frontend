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
      "flex items-center group/btn hover-effect gap-3",
      className
    )}
    {...props}
  >
    <span className="group-hover/btn:scale-110 hover-effect">{icon}</span>
    <span className="text-[13px] font-medium hidden sm:block">{count}</span>
  </button>
);

export default SocialActionBtn;
