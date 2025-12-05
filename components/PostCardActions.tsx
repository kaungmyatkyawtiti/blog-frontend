"use client";

import PostCard from "./PostCard";
import { useMutationDeletePost } from '@/hooks/postHook';
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { Post } from '@/types/post';
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Post;
}

export default function PostCardActions({ post }: PostCardProps) {
  const { showNoti } = useBoundStore();
  const { mutateAsync: deletePost, isSuccess } = useMutationDeletePost();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const result = await deletePost(post);
      console.log("delete post success from post card", result);
      showNoti("Successfully deleted post!")
    } catch (err) {
      console.log("delete movie error from movie card action", err);
      showNoti("Failed to delete post!")
    }
  }

  const handleOpenPost = () => {
    console.log("post", post);
    router.push(`/posts/${post.id}`)
  }

  return (
    <PostCard
      post={post}
      onDelete={handleDelete}
      onOpenPost={handleOpenPost}
    />
  )
}

