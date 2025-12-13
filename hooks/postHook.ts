import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/components/Providers"
import { createPostApi, deletePostApi, getAllPostsApi, getPostAllLikesApi, getPostByIdApi, likePostApi, unlikePostApi } from "./api/postApi"
import { NewPost, Post } from "@/types/post";

export const usegetAllPosts = () => useQuery({
  queryKey: ['posts'],
  queryFn: getAllPostsApi,
  refetchOnWindowFocus: false,
})

export const useGetPostById = (id: number) => useQuery({
  queryKey: ['posts', id],
  queryFn: () => getPostByIdApi(id),
  refetchOnWindowFocus: false,
})

export const useGetPostAllLikes = (type: string, id: number) => useQuery({
  queryKey: ['users', id, type],
  queryFn: () => getPostAllLikesApi(id),
  refetchOnWindowFocus: false,
})

// export const useGetPostById = (postId: number) => {
//   const data = queryClient.getQueryData<Post[]>(['posts']);
//   const result = data?.find(post => post.id === postId);
//   return result;
// };

export const useMutationCreatePost = () => useMutation({
  mutationFn: (post: NewPost) => createPostApi(post),
  onSettled: (newPost) => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    console.log("Create post onSettled", newPost);
  },
});

export const useMutationDeletePost = () => useMutation({
  mutationFn: (post: Post) => deletePostApi(post.id),

  onMutate: async (post) => {
    await queryClient.cancelQueries({ queryKey: ['posts'] });

    const previous = queryClient.getQueryData(['posts']);

    queryClient.setQueryData(
      ["posts"],
      (oldState: Post[]) => oldState.filter(p => p.id !== post.id)
    )

    return { previous };
  },
  onError: (err, variables, onMutateResult) => {
    console.log("post delete onError", err);
    queryClient.setQueryData(
      ['posts'],
      onMutateResult?.previous
    )
  },
});

export const useMutationLikePost = () => useMutation({
  mutationFn: (post: Post) => likePostApi(post.id),

  onSuccess: (newLike) => {
    console.log("Like post onSuccess", newLike);

    queryClient.setQueryData(
      ["posts"],
      (oldState: Post[]) =>
        oldState.map(post =>
          post.id === newLike.postId
            ? { ...post, likes: [...post.likes, newLike] }
            : post
        )
    )
  },
  onSettled: () => {
    console.log("Like post onSettled");
  },
});

export const useMutationUnlikePost = () => useMutation({
  mutationFn: (post: Post) => unlikePostApi(post.id),

  onMutate: async (post) => {
    await queryClient.cancelQueries({ queryKey: ['posts'] });

    const previous = queryClient.getQueryData(['posts']);

    console.log("post", post);

    const userLike = post.likes.find(like => like.userId === post.userId);

    queryClient.setQueryData(
      ["posts"],
      (oldState: Post[]) => oldState.map(p =>
        p.id === post.id
          ? {
            ...p,
            likes: p.likes.filter(l => l.userId !== userLike?.userId)
          }
          : p
      )
    )

    return { previous };
  },
  onError: (err, variables, onMutateResult) => {
    console.log("Unlike post onError", err);
    queryClient.setQueryData(
      ['posts'],
      onMutateResult?.previous
    )
  },
});
