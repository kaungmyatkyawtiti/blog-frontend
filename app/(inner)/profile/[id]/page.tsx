'use client'

import PostCard from "@/components/PostCard";
import Profile from "@/components/Profile";
import { queryClient } from "@/components/Providers";
import { useGetUserById } from "@/hooks/userHook";
import { use } from "react"

export default function ProfilePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params);

  const { data: user, isLoading, isError, error, refetch } = useGetUserById(+id);

  console.log("user", user);

  if (!user) return <div>Not found</div>

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Profile user={user} />
      <div className="my-10 space-y-6">
        {
          user.posts.map(post =>
            <PostCard key={post.id} post={post} />
          )
        }
      </div>
    </div>
  )
}

