import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/components/Providers"
import { createPostApi, deletePostApi, getAllPostsApi, likePostApi } from "./api/postApi"
import { NewPost, Post } from "@/types/post";

export const usegetAllPosts = () => useQuery({
  queryKey: ['posts'],
  queryFn: getAllPostsApi,
  refetchOnWindowFocus: false,
})

export const useGetPostById = (postId: number) => {
  const data = queryClient.getQueryData<Post[]>(['posts']);
  console.log("data from useGetPostById", data);
  const result = data?.find(post => post.id === postId);
  console.log("result", result);
  return result;
};

export const useMutationCreatePost = () => useMutation({
  mutationFn: (post: NewPost) => createPostApi(post),

  onSuccess: (newOne: NewPost) => {
    console.log("Create post onSuccess", newOne);

    queryClient.setQueryData(
      ["posts"],
      (oldState: Post[]) => [...oldState, newOne]
    )
  },
  onSettled: (newOne, error, variables, onMutateResult) => {
    console.log("Create post onSettled", newOne);
  },
});

export const useMutationDeletePost = () => useMutation({
  mutationFn: (post) => deletePostApi(post.id),

  onMutate: async (post: Post) => {
    await queryClient.cancelQueries({ queryKey: ['posts'] });

    const previous = queryClient.getQueryData(['posts']);

    queryClient.setQueryData(
      ["posts"],
      (oldState: Post[]) => oldState.filter(p => p.id !== post.id)
    )

    return { previous };
  },
  onSuccess: (post, variables, onMutateResult) => {
    console.log("post delete onSuccess", post, variables, onMutateResult);
  },

  onError: (err, post, onMutateResult) => {
    console.log("post delete onError", err);
    queryClient.setQueryData(
      ['posts'],
      onMutateResult?.previous
    )
  },

  onSettled: (post, error, variables, onMutateResult) => {
    console.log("post delete onSettled", post, variables, onMutateResult);
  },
});

export const useMutationLikePost = () => useMutation({
  mutationFn: (post: Post) => likePostApi(post.id),

  onSuccess: (newOne: Post) => {
    console.log("Like post onSuccess", newOne);

    queryClient.setQueryData(
      ["posts"],
      (oldState: Post[]) => [...oldState, newOne]
    )
  },
  onSettled: (newOne, error, variables, onMutateResult) => {
    console.log("Like post onSettled", newOne);
  },
});

export const useMutationUnlikePost = () => useMutation({
  mutationFn: (post: Post) => deletePostApi(post.id),

  onMutate: async (post: Post) => {
    await queryClient.cancelQueries({ queryKey: ['posts'] });

    const previous = queryClient.getQueryData(['posts']);

    queryClient.setQueryData(
      ["posts"],
      (oldState: Post[]) => oldState.filter(p => p.id !== post.id)
    )

    return { previous };
  },
  onSuccess: (post, variables, onMutateResult) => {
    console.log("Unlike post onSuccess", post, variables, onMutateResult);
  },

  onError: (err, post, onMutateResult) => {
    console.log("Unlike post onError", err);
    queryClient.setQueryData(
      ['posts'],
      onMutateResult?.previous
    )
  },

  onSettled: (post, error, variables, onMutateResult) => {
    console.log("Unlike post onSettled", post, variables, onMutateResult);
  },
});
