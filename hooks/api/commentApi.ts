import axiosInstance from "@/lib/axiosInstance";
import { AxiosResponse } from "axios";
import { Comment } from "@/types/comment";

export async function getAllCommentsApi(): Promise<Comment[]> {
  const { data } = await axiosInstance.get<AxiosResponse<Comment[]>>("api/comments");
  return data.data;
}

export async function createCommentApi(): Promise<Comment> {
  const { data } = await axiosInstance.post<AxiosResponse<Comment>>("api/comments");
  return data.data;
}

export async function likeCommentApi(id: number): Promise<Comment> {
  const { data } = await axiosInstance.post<AxiosResponse<Comment>>(`api/comments/like/${id}`);
  return data.data;
}

export async function unlikeCommentApi(id: number): Promise<Comment> {
  const { data } = await axiosInstance.delete<AxiosResponse<Comment>>(`api/comments/unlike/${id}`);
  return data.data;
}

export async function getCommentAllLikesApi(): Promise<Comment> {
  const { data } = await axiosInstance.get<AxiosResponse<Comment>>("api/comments/likes");
  return data.data;
}
