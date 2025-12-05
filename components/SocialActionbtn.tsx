import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SocialActionBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  className?: string;
}

const SocialActionBtn = ({
  icon,
  label,
  className,
  ...props
}: SocialActionBtnProps) => (
  <button
    className={cn(
      "flex items-center group/btn hover-effect gap-2",
      className
    )}
    {...props}
  >
    <span className="group-hover/btn:scale-110 hover-effect">{icon}</span>
    <span className="text-[13px] font-medium hidden sm:block">{label}</span>
  </button>
);

export default SocialActionBtn;
