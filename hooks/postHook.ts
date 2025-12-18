import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/components/Providers"
import { createPostApi, deletePostApi, getAllPostsApi, getFollowingPosts, getPostAllLikesApi, getPostByIdApi, likePostApi, unlikePostApi } from "./api/postApi"
import { NewPost, Post } from "@/types/post";
import { User } from "@/types/user";

// export const useGetAllPosts = () => useQuery({
//   queryKey: ['posts'],
//   queryFn: getAllPostsApi,
//   refetchOnWindowFocus: false,
// })
//
// export const useGetFollowingPosts = (showLatest: boolean) => useQuery({
//   queryKey: ['posts', showLatest],
//   queryFn: getFollowingPosts,
//   refetchOnWindowFocus: false,
// })

export const useGetAllPosts = (showLatest: boolean) => useQuery({
  queryKey: ["posts", showLatest],
  queryFn: () => (showLatest ? getAllPostsApi() : getFollowingPosts()),
  refetchOnWindowFocus: false,
});

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

export const useMutationCreatePost = (showLatest: boolean) => useMutation({
  mutationFn: (post: NewPost) => createPostApi(post),

  onSuccess: (newPost) => {
    console.log("Create post onSuccess", newPost);
    queryClient.cancelQueries({ queryKey: ["posts", showLatest] });
    queryClient.invalidateQueries({ queryKey: ["posts", showLatest] })
  },
});

export const useMutationDeletePost = (showLatest: boolean) => useMutation({
  mutationFn: (post: Post) => deletePostApi(post.id),

  onMutate: async (post) => {
    console.log("post", post);
    await queryClient.cancelQueries({ queryKey: ['posts', showLatest] });

    const previousPosts = queryClient.getQueryData(['posts', showLatest]);
    const previousUser = queryClient.getQueryData(['users', post.user.id]);

    queryClient.setQueryData(
      ["posts", showLatest],
      (oldPosts?: Post[]) => {
        if (!oldPosts) return oldPosts;
        return oldPosts.filter(p => p.id !== post.id)
      }
    )

    queryClient.setQueryData(
      ['users', post.user.id],
      (oldUser?: User) => {
        if (!oldUser) return oldUser;
        return {
          ...oldUser,
          posts: oldUser.posts.filter(p => p.id !== post.id),
        };
      }
    );
    return { previousPosts, previousUser };
  },
  onError: (err, post, onMutateResult) => {
    console.log("post delete onError", err);
    queryClient.setQueryData(
      ['posts', showLatest],
      onMutateResult?.previousPosts
    )
    queryClient.setQueryData(
      ['users', post.user.id],
      onMutateResult?.previousUser
    )
  },
});

export const useMutationLikePost = (showLatest: boolean, ownerId: number) => useMutation({
  mutationFn: (post: Post) => likePostApi(post.id),

  onSuccess: (newLike) => {
    console.log("Like post onSuccess", newLike);
    queryClient.setQueryData(
      ["posts", showLatest],
      (oldPosts?: Post[]) => {
        if (!oldPosts) return oldPosts;
        return oldPosts.map(post =>
          post.id === newLike.postId
            ? {
              ...post,
              likes: [...post.likes, newLike]
            }
            : post
        )
      }
    )

    queryClient.setQueryData(
      ["users", ownerId],
      (oldUser?: User) => {
        if (!oldUser) return oldUser;
        return {
          ...oldUser,
          posts: oldUser.posts.map(post =>
            post.id === newLike.postId
              ? {
                ...post,
                likes: [...post.likes, newLike],
              }
              : post
          ),
        };
      }
    )
  },
  onSettled: () => {
    console.log("Like post onSettled");
  },
});

export const useMutationUnlikePost = (showLatest: boolean, authUserId: number) => useMutation({
  mutationFn: (post: Post) => unlikePostApi(post.id),

  onMutate: async (post) => {
    await queryClient.cancelQueries({ queryKey: ['posts', showLatest] });
    await queryClient.cancelQueries({ queryKey: ['users', post.user.id] });

    const previousPosts = queryClient.getQueryData(['posts', showLatest]);
    const previousUser = queryClient.getQueryData(["users", post.user.id])

    queryClient.setQueryData(
      ["posts", showLatest],
      (oldPosts?: Post[]) => {
        if (!oldPosts) return oldPosts;
        return oldPosts.map(p =>
          p.id === post.id
            ? {
              ...p,
              likes: p.likes.filter(l => l.userId !== authUserId)
            }
            : p
        )
      }
    )

    queryClient.setQueryData(
      ["users", post.user.id],
      (oldUser?: User) => {
        if (!oldUser) return oldUser;
        return {
          ...oldUser,
          posts: oldUser.posts.map(p =>
            p.id === post.id
              ? {
                ...p,
                likes: p.likes.filter(l => l.userId !== authUserId),
              }
              : p
          ),
        }
      }
    )

    return { previousPosts, previousUser };
  },
  onError: (err, variables, onMutateResult) => {
    console.log("Unlike post onError", err);
    queryClient.setQueryData(
      ['posts', showLatest],
      onMutateResult?.previousPosts
    )

    queryClient.setQueryData(
      ['users', variables.user.id],
      onMutateResult?.previousUser
    )
  },
});
