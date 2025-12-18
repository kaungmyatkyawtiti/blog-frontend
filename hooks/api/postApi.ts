import axiosInstance from "@/lib/axiosInstance";
import { NewPost, Post, PostLike } from "@/types/post";

export async function getAllPostsApi(): Promise<Post[]> {
  const { data } = await axiosInstance.get("api/posts");
  // console.log("data from getAllPostsApi", data);
  return data.data;
}

export async function getFollowingPosts(): Promise<Post[]> {
  const { data } = await axiosInstance.get("api/following/posts");
  return data.data;
}

export async function getPostByIdApi(id: number): Promise<Post> {
  const { data } = await axiosInstance.get(`api/posts/${id}`);
  return data.data;
}

export async function createPostApi(post: NewPost): Promise<Post> {
  const { data } = await axiosInstance.post("api/posts", post);
  return data.data;
}

export async function deletePostApi(id: number): Promise<void> {
  await axiosInstance.delete(`api/posts/${id}`);
}

export async function likePostApi(id: number): Promise<PostLike> {
  const { data } = await axiosInstance.post(`api/like/posts/${id}`);
  return data.data;
}

export async function unlikePostApi(id: number): Promise<void> {
  await axiosInstance.delete(`api/unlike/posts/${id}`);
}

export async function getPostAllLikesApi(id: number): Promise<PostLike[]> {
  const { data } = await axiosInstance.get(`api/likes/posts/${id}`);
  return data.data;
}
