'use client'

import ContentBox from '@/components/ContentBox'
import PostComments from '@/components/PostComments'
import { useGetPostById } from '@/hooks/postHook'
import { use } from 'react'

export default function BlogPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = use(params)

  const { data: post, isSuccess, isError, isPending, isLoading, refetch, error } = useGetPostById(+postId);

  console.log("post", post);

  if (!post) return <div>Not found</div>

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <div
        className="group relative bg-card border border-border/60 rounded-xl p-6 hover:bg-card/90 shadow-sm hover:shadow-md hover:border-border hover-effect"
      >
        <ContentBox item={post} />
      </div>

      <PostComments post={post} />
    </div>
  )
}
