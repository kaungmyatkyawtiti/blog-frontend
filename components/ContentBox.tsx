"use client";

import Image from 'next/image';
import { useIsMobile } from '@/hooks/useMobile';
import { cn } from '@/lib/utils';
import { formatRelative } from "date-fns"
import Link from 'next/link';
import { Post } from '@/types/post';
import { Comment } from '@/types/comment';

type ContentBoxProps =
  | {
    item: Post;
    avatarSize?: number;
  }
  | {
    item: Comment;
    avatarSize?: number;
  };

export default function ContentBox({
  item,
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
          src={item.user.image || "/default_user.png"}
          alt="avatar"
          fill
          sizes='auto'
          loading='eager'
          className="object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <Link
          href={`/profile/${item.user.id}`}
        >
          <h3 className="font-medium tracking-tight cursor-pointer hover:underline hover:text-social-indigo hover-effect">
            {item.user.username}
          </h3>
        </Link>
        <p className="text-xs text-social-green font-semibold">
          {formatRelative(item.user.created, new Date())}
        </p>

        <p className="text-[clamp(14px,2vw,15px)] my-5 leading-relaxed font-light text-card-foreground/80">
          {item.content}
        </p>
      </div>
    </div>
  )
}
