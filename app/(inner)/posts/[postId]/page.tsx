'use client'

import PostCard from '@/components/PostCard'
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
      <PostCard post={post} />
      {/**/}
      <PostComments post={post} />
    </div>
  )
}
