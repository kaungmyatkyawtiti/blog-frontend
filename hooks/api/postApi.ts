import axiosInstance from "@/lib/axiosInstance";
import { Post } from "@/types/post";
import { AxiosResponse } from "axios";

export async function getAllPostsApi(): Promise<Post[]> {
  const { data } = await axiosInstance.get<AxiosResponse<Post[]>>("api/posts");
  console.log("data from getAllPostsApi", data);
  return data.data;
}

export async function deletePostApi(id: number): Promise<Post> {
  const { data } = await axiosInstance.delete<AxiosResponse<Post>>(`api/posts/${id}`);
  return data.data;
}
