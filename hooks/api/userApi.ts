import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/types/user";

export async function getProfileById(id: number): Promise<User> {
  const { data } = await axiosInstance.get(`api/auth/profiles/${id}`);
  return data.data;
}
