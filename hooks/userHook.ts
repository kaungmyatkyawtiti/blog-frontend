import { useMutation, useQuery } from "@tanstack/react-query"
import { getProfileById } from "./api/userApi"

export const useGetPostById = (id: number) => useQuery({
  queryKey: ['users', id],
  queryFn: () => getProfileById(id),
  refetchOnWindowFocus: false,
})
