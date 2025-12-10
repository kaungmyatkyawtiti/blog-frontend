import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

export async function getProfileById(id: number): Promise<User> {
  const { data } = await axiosInstance.get<AxiosResponse<User>>(`api/auth/profiles/${id}`);
  return data.data;
}
