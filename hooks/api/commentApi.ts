import axiosInstance from "@/lib/axiosInstance";
import { Comment, CommentLike, NewComment } from "@/types/comment";

export async function getAllCommentsApi(): Promise<Comment[]> {
  const { data } = await axiosInstance.get("api/comments");
  return data.data;
}

export async function createCommentApi(comment: NewComment): Promise<Comment> {
  const { data } = await axiosInstance.post("api/comments", comment);
  return data.data;
}

export async function deleteCommentApi(id: number): Promise<void> {
  await axiosInstance.delete(`api/comments/${id}`);
}

export async function likeCommentApi(id: number): Promise<CommentLike> {
  const { data } = await axiosInstance.post(`api/like/comments/${id}`);
  return data.data;
}

export async function unlikeCommentApi(id: number): Promise<void> {
  await axiosInstance.delete(`api/unlike/comments/${id}`);
}

export async function getCommentAllLikesApi(id: number): Promise<CommentLike[]> {
  const { data } = await axiosInstance.get(`api/likes/comments/${id}`);
  return data.data;
}
