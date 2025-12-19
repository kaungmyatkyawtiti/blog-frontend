import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { useGetAllNotis } from "@/hooks/notiHook";

export default function NotiButton() {
  const { data: notis, isLoading } = useGetAllNotis();

  const unreadCount = notis?.filter(noti => !noti.read).length;
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative p-1 rounded-full"
    >
      <Bell size={24} />

      <span
        className="absolute -top-1 -right-1 min-w-[18px] h-[18px] 
          px-1 flex items-center justify-center rounded-full bg-red-500
          text-[10px] font-semibold text-white leading-none"
      >
        {unreadCount}
      </span>
    </Button>
  )
}
