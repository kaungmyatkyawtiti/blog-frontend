"use client";

import Image from 'next/image';
import { useIsMobile } from '@/hooks/useMobile';
import { cn } from '@/lib/utils';
import { formatRelative } from "date-fns"

interface ContentBoxProps {
  avatar: string | null;
  username: string;
  created: string;
  content: string;
  avatarSize?: number;
}

export default function ContentBox({
  avatar,
  username,
  created,
  content,
  avatarSize = 60
}: ContentBoxProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "flex gap-8",
        isMobile && "flex-col gap-4"
      )}
    >
      <div
        style={{
          width: avatarSize,
          height: avatarSize,
        }}
        className="relative rounded-full overflow-hidden"
      >
        <Image
          src={avatar || "/logo.jpg"}
          alt="avatar"
          fill
          sizes='autofit'
          loading='eager'
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-medium tracking-tight cursor-pointer hover:underline hover:text-social-indigo hover-effect">
          {username}
        </h3>
        <p className="text-xs text-social-green font-semibold">
          {formatRelative(created, new Date())}
        </p>

        <p className="text-[clamp(14px,2vw,15px)] my-5 leading-relaxed font-light text-card-foreground/80">
          {content}
        </p>
      </div>
    </div>
  )
}
