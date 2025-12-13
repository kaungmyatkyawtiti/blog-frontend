"use client";

import BackButton from "@/components/BackButton";
import UserContainer from "@/components/UserContainer";
import { useGetAllLikes } from "@/hooks/useGetAllLikes";
import { use } from "react"

export default function LikesPage({
  params,
}: {
  params: Promise<{ type: string, id: string }>
}) {
  const { type, id } = use(params);
  console.log("type", type, "id", id);

  const { data: likes, isSuccess, isError, isPending, isLoading, refetch, error } = useGetAllLikes(type, +id);
  console.log("likes", likes);

  if (!likes) return <div>Not found</div>

  return (
    <div className="px-4 mx-auto my-10 w-full max-w-3xl">
      <div className="flex items-center mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold">Likes</h1>
      </div>

      {
        likes.map(like =>
          <UserContainer key={like.id} user={like.user} />
        )
      }
    </div>
  )
}
