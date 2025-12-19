import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "@/components/Providers"
import { getAllNotisApi, readAllNotisApi, readNotiByIdApi } from "./api/notiApi";
import { Noti } from "@/types/noti";

export const useGetAllNotis = () => useQuery({
  queryKey: ["notis"],
  queryFn: getAllNotisApi,
  refetchOnWindowFocus: false,
});

export const useMutationReadAllNotis = () => useMutation({
  mutationFn: readAllNotisApi,

  onMutate: async () => {
    // console.log("context", context.client);
    // console.log("queryClient", queryClient);

    await queryClient.cancelQueries({ queryKey: ['notis'] })

    const previous = queryClient.getQueryData(['notis'])

    queryClient.setQueryData(
      ['notis'],
      (oldState: Noti[]) =>
        oldState.map(noti => ({
          ...noti,
          read: true
        }))
    )

    return { previous }
  },
  onError: (err, newNoti, onMutateResult) => {
    console.log("Read all notis onError", err, "newNoti", newNoti);
    queryClient.setQueryData(
      ['notis'],
      onMutateResult?.previous
    )
  }
})

export const useMutationReadNotiById = () => useMutation({
  mutationFn: (noti: Noti) => readNotiByIdApi(noti.id),

  onMutate: async (newNoti) => {
    await queryClient.cancelQueries({ queryKey: ['notis'] })

    const previous = queryClient.getQueryData(['notis'])
    console.log("newNoti", newNoti)

    queryClient.setQueryData(
      ['notis'],
      (oldState: Noti[]) =>
        oldState.map(noti =>
          noti.id === newNoti.id
            ? { ...noti, read: true }
            : noti
        )
    )

    return { previous }
  },
  onError: (err, newNoti, onMutateResult) => {
    console.log("Read noti by Id onError", err, "newNoti", newNoti);
    queryClient.setQueryData(
      ['notis'],
      onMutateResult?.previous
    )
  },
})
