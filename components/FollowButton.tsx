"use client";

import { useMutationFollowUser, useMutationUnfollowUser } from "@/hooks/userHook";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import { toast } from "sonner";

interface FollowButtonProps {
  user: User;
  className?: string;
}

export default function FollowButton({
  user,
  className,
}: FollowButtonProps) {
  const auth = useBoundStore(state => state.user);
  const { mutateAsync: followUser } = useMutationFollowUser();
  const { mutateAsync: unfollowUser } = useMutationUnfollowUser();

  if (!auth || auth.id === user.id) return null;

  const isFollowing = user.followers.some(f => f.followerId === auth.id);

  // console.log("isFollowing", isFollowing)

  const handleFollow = async () => {
    try {
      const result = await followUser(user);
      console.log("Following success", result);
      toast.success("You follow that user.");
    } catch (error) {
      console.log("Following error", error);
      toast.error("Following failed.");
    }
  }

  const handleUnfollow = async () => {
    try {
      const result = await unfollowUser(user);
      console.log("Unfollow success", result);
      toast.success("You unfollow that user.");
    } catch (error) {
      console.log("Unfollow error", error);
      toast.error("Unfollow is failed.");
    }
  }

  return (
    <button
      className={cn(
        'bg-social-indigo font-medium px-2 py-1 rounded-lg text-sm hover:scale-110 hover-effect',
        isFollowing
          ? "bg-social-indigo text-white"
          : "bg-foreground/20 text-foreground",
        className
      )}
      onClick={isFollowing ? handleUnfollow : handleFollow}
    >
      {isFollowing ? "following" : "follow"}
    </button>
  )
}
