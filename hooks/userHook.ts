import { useQuery } from "@tanstack/react-query";
import { getProfileById } from "./api/userApi";

export const useGetProfileById = (id: number) => useQuery({
  queryKey: ['profile', id],
  queryFn: () => getProfileById(id),
  refetchOnWindowFocus: false,
});
