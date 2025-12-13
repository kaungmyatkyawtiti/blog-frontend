"use client";

import PostCard from "@/components/PostCard";
import { usegetAllPosts } from "@/hooks/postHook";
import { dummyPosts } from "@/utils/constants";

export default function HomePage() {
  const { data, isSuccess, isError, isPending, isLoading, refetch, error } = usegetAllPosts();

  console.log("posts", data);

  if (isLoading) return <div>Is Loading</div>

  if (!data) return <div>Not found</div>

  if (isError) return <div> {error.message} </div>

  return (
    <main className="max-w-3xl px-4 mx-auto my-10 space-y-6">
      {
        data.length === 0 &&
        <div className="text-center text-foreground">
          <p>No posts yet. Start the conversation!</p>
        </div>
      }
      {
        data.map(post =>
          <PostCard
            key={post.id}
            post={post}
          />
        )
      }
    </main >
  )
}
