import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/components/Providers"
import { createCommentApi, deleteCommentApi, getCommentAllLikesApi, likeCommentApi, unlikeCommentApi } from "./api/commentApi";
import { Comment, NewComment } from "@/types/comment";
import { Post } from "@/types/post";

export const useGetCommentAllLikes = (type: string, id: number) => useQuery({
  queryKey: ['users', id, type],
  queryFn: () => getCommentAllLikesApi(id),
  refetchOnWindowFocus: false,
})

export const useMutationCreateComment = () => useMutation({
  mutationFn: (comment: NewComment) => createCommentApi(comment),

  onSettled: (newComment) => {
    queryClient.invalidateQueries({ queryKey: ["posts", newComment?.postId] });
    console.log("Create comment onSettled", newComment);
  },
});

export const useMutationDeleteComment = () => useMutation({
  mutationFn: (comment: Comment) => deleteCommentApi(comment.id),

  onMutate: async (comment) => {
    await queryClient.cancelQueries({ queryKey: ['posts', comment.postId] });

    const previous = queryClient.getQueryData(['posts', comment.postId]);

    queryClient.setQueryData(
      ["posts", comment.postId],
      (oldState: Post) => {
        return {
          ...oldState,
          comments: oldState.comments.filter(cmt => cmt.id !== comment.id)
        }
      }
    )

    return { previous };
  },
  onError: (err, comment, onMutateResult) => {
    console.log("comment delete onError", err);
    queryClient.setQueryData(
      ['posts', comment.postId],
      onMutateResult?.previous
    )
  },
});

export const useMutationLikeComment = () => useMutation({
  mutationFn: (comment: Comment) => likeCommentApi(comment.id),

  onSuccess: (newLike, comment) => {
    console.log("Like comment onSuccess", newLike);
    const postId = comment.postId;

    queryClient.setQueryData(
      ["posts", postId],
      (oldState: Post) => {
        return {
          ...oldState,
          comments: oldState.comments.map(cmt =>
            cmt.id === newLike.commentId
              ? { ...cmt, likes: [...cmt.likes, newLike] }
              : cmt
          )
        }
      }
    )
  },
  onSettled: () => {
    console.log("Like comment onSettled");
  },
});

export const useMutationUnlikeComment = () => useMutation({
  mutationFn: (comment: Comment) => unlikeCommentApi(comment.id),

  onMutate: async (comment) => {
    await queryClient.cancelQueries({ queryKey: ['posts', comment.postId] });

    const previous = queryClient.getQueryData(['posts', comment.postId]);

    console.log("comment", comment);

    const userLike = comment.likes.find(like => like.userId === comment.userId);

    queryClient.setQueryData(
      ["posts", comment.postId],
      (oldState: Post) => {
        return {
          ...oldState,
          comments: oldState.comments.map(cmt =>
            cmt.id === comment.id
              ? {
                ...cmt,
                likes: cmt.likes.filter(l => l.userId !== userLike?.userId)
              }
              : cmt
          )
        }
      }
    )

    return { previous };
  },
  onError: (err, comment, onMutateResult) => {
    console.log("Unlike comment onError", err);
    queryClient.setQueryData(
      ['posts', comment.postId],
      onMutateResult?.previous
    )
  },
});
