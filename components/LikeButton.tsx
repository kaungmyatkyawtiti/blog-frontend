import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  className?: string;
  onLike: () => void;
  onUnlike: () => void;
  isLiked: boolean;
  onLikedList: () => void;
  count: number;
}

const LikeButton = ({
  className,
  onLike,
  onUnlike,
  isLiked,
  onLikedList,
  count
}: LikeButtonProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-foreground/70",
        className
      )}
    >
      <button
        onClick={isLiked ? onUnlike : onLike}
        className="hover:scale-110 hover-effect"
      >
        <Heart
          size={22}
          className={cn(
            isLiked ? "fill-pink-500 text-pink-500" : "hover:text-pink-500"
          )}
        />
      </button>
      <button
        className="text-[15px] font-medium hover:text-foreground"
        onClick={onLikedList}
      >
        {count}
      </button>
    </div >
  )
}

export default LikeButton;
