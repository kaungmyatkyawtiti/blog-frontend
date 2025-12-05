import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/components/Providers"
import { deletePostApi, getAllPostsApi } from "./api/postApi"
import { Post } from "@/types/post";

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
