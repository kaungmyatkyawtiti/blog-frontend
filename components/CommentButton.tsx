import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

interface CommentButtonProps {
  className?: string;
  count: number;
}

export default function CommentButton({
  className,
  count
}: CommentButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-3 text-foreground/70 group/comment",
        className
      )}
    >
      <p
        className="group-hover/comment:scale-110 hover-effect"
      >
        <MessageSquare
          size={22}
          className='group-hover/comment:text-blue-500'
        />
      </p>
      <p
        className="text-[15px] font-medium group-hover/comment:text-foreground"
      >
        {count}
      </p>
    </button >
  )
}
