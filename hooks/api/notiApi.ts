import axiosInstance from "@/lib/axiosInstance";
import { Noti } from "@/types/noti";

export async function getAllNotisApi(): Promise<Noti[]> {
  const { data } = await axiosInstance.get("api/notis");
  return data.data;
}

export async function readAllNotisApi(): Promise<void> {
  await axiosInstance.put("api/notis/read");
}

export async function readNotiByIdApi(id: number): Promise<Noti> {
  const { data } = await axiosInstance.put(`api/notis/read/${id}`);
  return data.data;
}
