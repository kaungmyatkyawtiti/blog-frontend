import { useGetPostAllLikes } from "@/hooks/postHook";
import { useGetCommentAllLikes } from "@/hooks/commentHook";

export const useGetAllLikes = (type: string, id: number) => {
  if (type === "comments") {
    return useGetCommentAllLikes(type, id);
  }

  return useGetPostAllLikes(type, id);
};
