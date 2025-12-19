"use client";

import { Noti } from "@/types/noti";
import { Heart, MessageSquare, Check } from "lucide-react";
import Image from "next/image";
import { formatRelative } from "date-fns";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMobile";
import { Button } from "@/components/ui/button";
import { useMutationReadNotiById } from "@/hooks/notiHook";

interface NotiCardProps {
  noti: Noti;
}

export default function NotiCard({ noti }: NotiCardProps) {
  const isMobile = useIsMobile();
  const likeIcon = noti.type === "like";
  const { mutateAsync: readNoti } = useMutationReadNotiById();

  const handleReadNoti = async () => {
    try {
      await readNoti(noti);
      console.log("Read noti by Id success");
    } catch (err) {
      console.log("Read noti by Id failed", err);
    }
  }

  return (
    <div
      className={cn(
        "flex gap-4 p-4 cursor-pointer border-b border-border last:border-b-0 hover:bg-card hover-effect",
        isMobile && "flex-col"
      )}
    >
      <div className="shrink-0">
        {likeIcon ? (
          <Heart size={22} className="fill-pink-500 text-pink-500" />
        ) : (
          <MessageSquare size={22} className="fill-blue-500 text-blue-500" />
        )}
      </div>

      <div
        className={cn(
          "flex justify-between items-center w-full gap-2",
          isMobile && "px-2"
        )}
      >
        {/* Content */}
        <div className="flex gap-3">
          <Image
            src={noti.user.image || "/default_user.png"}
            alt="avatar"
            width={30}
            height={30}
            className="w-[30px] h-[30px] rounded-full object-cover shrink-0"
          />

          <p className="text-sm leading-relaxed space-x-2">
            <span className="font-semibold hover:text-social-indigo hover:underline">
              {noti.user.username}
            </span>
            <span className="text-foreground/80">
              {noti.content}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-social-green whitespace-nowrap font-medium">
            {formatRelative(noti.created, new Date())}
          </span>

          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-7 w-7 rounded-full",
              noti.read && "bg-social-indigo hover:bg-social-indigo/90"
            )}
            onClick={handleReadNoti}
          >
            <Check
              size={16}
              className={cn(
                "text-foreground/80",
                noti.read && "text-white"
              )}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
