import axiosInstance from "@/lib/axiosInstance";
import { Follow, User } from "@/types/user";

export async function getUserByIdApi(id: number): Promise<User> {
  const { data } = await axiosInstance.get(`api/users/${id}`);
  return data.data;
}

export async function followUserApi(id: number): Promise<Follow> {
  const { data } = await axiosInstance.post(`api/users/follow/${id}`);
  return data.data;
}

export async function unfollowUserApi(id: number): Promise<void> {
  await axiosInstance.delete(`api/users/unfollow/${id}`);
}

export async function searchUserApi(q: string): Promise<User> {
  const { data } = await axiosInstance.delete(`api/users/search?q=${q}`);
  return data.data;
}
