"use client";

import { Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { formatRelative } from "date-fns"
import { Post } from '@/types/post';
import DeletePostBtn from './DeletePostBtn';
import SocialActionBtn from './SocialActionbtn';
import { useIsMobile } from '@/hooks/useMobile';
import { cn } from '@/lib/utils';
import { useBoundStore } from '@/lib/hooks/useBoundStore';

interface PostCardProps {
  post: Post;
  onDelete?: () => void;
  onOpen?: () => void;
  onLike?: () => void;
  onUnlike?: () => void;
}

const PostCard = ({
  post,
  onDelete,
  onOpen,
  onLike,
  onUnlike,
}: PostCardProps) => {
  const isMobile = useIsMobile();

  const user = useBoundStore(state => state.user);

  const isLiked = user && post.likes.some(like => like.userId === user.id);

  const isOwner = user && user.id === post.user.id;

  return (
    <div
      className="group relative bg-card border border-border/60 rounded-xl p-6 hover:bg-card/90 shadow-sm hover:shadow-md hover:border-border hover-effect"
    >
      {
        onDelete && isOwner &&
        <DeletePostBtn
          onDelete={onDelete}
          title={"Delete The Post."}
        />
      }
      <div
        className={cn(
          "flex gap-8",
          isMobile && "flex-col gap-4"
        )}
      >
        <Image
          src={post.user.image || "/logo.jpg"}
          alt='avator'
          width={60}
          height={60}
          className='rounded-full h-16 w-16 object-cover'
        />
        <div className="flex-1 space-y-2">
          <h3 className="font-medium tracking-tight cursor-pointer hover:underline hover:text-social-indigo hover-effect">
            {post.user.username}
          </h3>
          <p className="text-xs text-social-green font-semibold">
            {formatRelative(post.created, new Date())}
          </p>

          <p className="my-6 text-[15px] leading-relaxed wrap-break-word font-light text-card-foreground/80">
            {post.content}
          </p>

          <div
            className="flex items-center gap-16 border-t border-border pt-5 text-foreground/70">
            <SocialActionBtn
              icon={
                <Heart
                  size={20}
                  className={
                    isLiked
                      ? "text-pink-500 fill-pink-500"
                      : "hover:text-pink-500"
                  }
                />
              }
              count={post.likes.length}
              onClick={isLiked ? onUnlike : onLike}
            />
            <SocialActionBtn
              icon={
                <MessageCircle
                  size={20}
                  className='hover:text-blue-500'
                />
              }
              count={post.comments.length}
              onClick={onOpen}
            />
          </div>
        </div>
      </div>
    </div >
  );
};

export default PostCard;
