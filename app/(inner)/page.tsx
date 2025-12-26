"use client";

import PostCard from "@/components/PostCard";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react"
import { useGetAllPosts } from "@/hooks/postHook";
import { useState } from "react";
import { useBoundStore } from "@/lib/hooks/useBoundStore";
import { cn } from "@/lib/utils";
import FeedButton from "@/components/FeedButton";

export default function HomePage() {
  const showLatest = useBoundStore(state => state.showLatest);
  const { toggleShowLatest } = useBoundStore();
  const auth = useBoundStore(state => state.user);

  const { data, isSuccess, isError, isPending, isLoading, refetch, error } = useGetAllPosts(showLatest);
  console.log("posts", data);

  if (isLoading) return <div>Is Loading</div>

  if (!data) return <div>Not found</div>

  if (isError) return <div> {error.message} </div>

  return (
    <>
      {auth && (
        <div className="flex justify-center mt-10">
          <div className="inline-flex rounded-lg bg-card p-1 border border-border shadow-inner">
            <FeedButton
              isActive={showLatest}
              onClick={() => toggleShowLatest(true)}
              disabled={showLatest}
            >
              Latest
            </FeedButton>

            <FeedButton
              isActive={!showLatest}
              onClick={() => toggleShowLatest(false)}
              disabled={!showLatest}
            >
              Following
            </FeedButton>
          </div>
        </div>
      )}
      <main className="max-w-3xl px-4 mx-auto my-8 space-y-6">
        {
          data.length === 0 ? (
            <div className="flex justify-center items-center p-10 bg-card rounded-lg text-foreground border border-border">
              <p className="text-lg font-medium">No posts yet. Start the conversation!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {data.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )
        }
      </main>
    </>
  )
}
