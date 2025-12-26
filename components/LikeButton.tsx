"use client";

import {
  useMutationLikeComment,
  useMutationUnlikeComment,
} from "@/hooks/commentHook";
import {
  useMutationLikePost,
  useMutationUnlikePost,
} from "@/hooks/postHook";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Comment } from "@/types/comment";
import { Post } from "@/types/post";

type LikeButtonProps =
  | {
    type: "post";
    item: Post;
    className?: string;
  }
  | {
    type: "comment";
    item: Comment;
    className?: string;
  };

const LikeButton = ({ type, item, className }: LikeButtonProps) => {
  const router = useRouter();
  const showLatest = useBoundStore(state => state.showLatest);
  const { showNoti } = useBoundStore();
  const user = useBoundStore(state => state.user);
  const authUserId = user?.id!;
  const { mutateAsync: likePost } = useMutationLikePost(showLatest, item.userId);
  const { mutateAsync: unlikePost } = useMutationUnlikePost(showLatest, authUserId);
  const { mutateAsync: likeComment } = useMutationLikeComment();
  const { mutateAsync: unlikeComment } = useMutationUnlikeComment(authUserId);

  const isLiked = user && item.likes.some(like => like.userId === user.id);

  const handleLike = async () => {
    try {
      if (type === "comment") {
        const result = await likeComment(item);
        console.log("Like comment success", result);
        showNoti("You liked the comment!");
      } else {
        const result = await likePost(item);
        console.log("Like post success", result);
        showNoti("You liked the post!");
      }
    } catch (err) {
      console.log("Like error", err);
      showNoti("Like failed!");
    }
  };

  const handleUnlike = async () => {
    try {
      if (type === "comment") {
        await unlikeComment(item);
        console.log("Unlike comment success");
        showNoti("You unliked the comment!");
      } else {
        await unlikePost(item);
        console.log("Unlike post success");
        showNoti("You unliked the post!");
      }
    } catch (err) {
      console.log("Unlike error", err);
      showNoti("Unlike failed!");
    }
  };

  const handleLikedList = () => {
    router.push(
      type === "comment"
        ? `/likes/comments/${item.id}`
        : `/likes/posts/${item.id}`
    );
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 text-foreground/70",
        className
      )}
    >
      <button
        onClick={isLiked ? handleUnlike : handleLike}
        disabled={!user}
        className={cn(
          "hover:scale-110 hover-effect",
          !user && "hover:scale-100"
        )}
      >
        <Heart
          size={22}
          className={cn(
            isLiked
              ? "fill-pink-500 text-pink-500"
              : "hover:text-pink-500"
          )}
        />
      </button>

      <button
        className="text-[15px] font-medium hover:text-foreground"
        onClick={handleLikedList}
      >
        {item.likes.length}
      </button>
    </div>
  );
};

export default LikeButton;
