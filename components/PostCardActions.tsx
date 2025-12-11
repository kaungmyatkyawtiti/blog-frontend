"use client";

import PostCard from "./PostCard";
import { useMutationDeletePost, useMutationLikePost, useMutationUnlikePost } from '@/hooks/postHook';
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { Post } from '@/types/post';
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Post;
}

export default function PostCardActions({ post }: PostCardProps) {
  const { showNoti } = useBoundStore();

  const { mutateAsync: deletePost, isSuccess: deleteSuccess } = useMutationDeletePost();
  const { mutateAsync: likePost, isSuccess: likeSuccess } = useMutationLikePost();
  const { mutateAsync: unlikePost, isSuccess: unlikeSuccess } = useMutationUnlikePost();

  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deletePost(post);
      console.log("Delete post success from post card");
      showNoti("Successfully deleted post!")
    } catch (err) {
      console.log("Delete post error from post card action", err);
      showNoti("Failed to delete post!")
    }
  }

  const handleOpen = () => {
    console.log("post", post);
    router.push(`/posts/${post.id}`)
  }

  const handleLike = async () => {
    try {
      const result = await likePost(post);
      console.log("Like post success from post card", result);
      showNoti("You liked the post!")
    } catch (err) {
      console.log("Like post error from post card action", err);
      showNoti("Like the post failed!")
    }
  }

  const handleUnike = async () => {
    try {
      await unlikePost(post);
      console.log("Unlike post success from post card");
      showNoti("You unliked the post!")
    } catch (err) {
      console.log("Unlike post error from post card action", err);
      showNoti("Unlike the post failed!")
    }
  }

  return (
    <PostCard
      post={post}
      onDelete={handleDelete}
      onOpen={handleOpen}
      onLike={handleLike}
      onUnlike={handleUnike}
    />
  )
}

