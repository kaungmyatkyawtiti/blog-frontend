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
    <main className="max-w-3xl px-4 mx-auto my-10 space-y-6">
      {
        auth && (
          <div className="inline-flex rounded-lg bg-muted p-1 border border-border shadow-inner">
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
        )
      }

      {/* <div className="w-2/3"> */}
      {/*   <InputGroup> */}
      {/*     <InputGroupInput placeholder="Search..." /> */}
      {/*     <InputGroupAddon> */}
      {/*       <SearchIcon /> */}
      {/*     </InputGroupAddon> */}
      {/*   </InputGroup> */}
      {/* </div> */}

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
