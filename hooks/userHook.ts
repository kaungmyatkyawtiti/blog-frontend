import { useMutation, useQuery } from "@tanstack/react-query"
import { followUserApi, getUserByIdApi, unfollowUserApi, } from "./api/userApi"
import { queryClient } from "@/components/Providers"
import { User } from "@/types/user";

export const useGetUserById = (id: number) => useQuery({
  queryKey: ['users', id],
  queryFn: () => getUserByIdApi(id),
  refetchOnWindowFocus: false,
})

export const useMutationFollowUser = () => useMutation({
  mutationFn: (user: User) => followUserApi(user.id),

  onSuccess: async (follow) => {
    console.log("Follow user onSuccess", follow);
    await queryClient.refetchQueries({ queryKey: ["users"] });
    await queryClient.refetchQueries({ queryKey: ["user"] });
    await queryClient.refetchQueries({ queryKey: ["search"] });
  },
  onSettled: () => {
    console.log("Follow user onSettled");
  },
});

export const useMutationUnfollowUser = () => useMutation({
  mutationFn: (user: User) => unfollowUserApi(user.id),

  onSuccess: async () => {
    console.log("Unfollow user onSuccess");
    await queryClient.refetchQueries({ queryKey: ["users"] });
    await queryClient.refetchQueries({ queryKey: ["user"] });
    await queryClient.refetchQueries({ queryKey: ["search"] });
  },
  onSettled: () => {
    console.log("Unfollow user onSettled");
  },
});
