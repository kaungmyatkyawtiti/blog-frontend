import axiosInstance from "@/lib/axiosInstance";
import { NewPost, Post } from "@/types/post";
import { AxiosResponse } from "axios";

export async function getAllPostsApi(): Promise<Post[]> {
  const { data } = await axiosInstance.get<AxiosResponse<Post[]>>("api/posts");
  console.log("data from getAllPostsApi", data);
  return data.data;
}

export async function createPostApi(post: NewPost): Promise<Post> {
  const { data } = await axiosInstance.post<AxiosResponse<Post>>("api/posts", post);
  return data.data;
}

export async function deletePostApi(id: number): Promise<Post> {
  const { data } = await axiosInstance.delete<AxiosResponse<Post>>(`api/posts/${id}`);
  return data.data;
}

export async function likePostApi(id: number): Promise<Post> {
  const { data } = await axiosInstance.post<AxiosResponse<Post>>(`api/posts/like/${id}`);
  return data.data;
}

export async function unlikePostApi(id: number): Promise<Post> {
  const { data } = await axiosInstance.delete<AxiosResponse<Post>>(`api/posts/unlike/${id}`);
  return data.data;
}

export async function getPostAllLikesApi(): Promise<Post> {
  const { data } = await axiosInstance.get<AxiosResponse<Post>>("api/posts/likes");
  return data.data;
}
