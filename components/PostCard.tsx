import { Heart, MessageCircle, Share2, Clock } from 'lucide-react';
import Image from 'next/image';
import { formatRelative } from "date-fns"
import { Post } from '@/types/post';
import DeletePostBtn from './DeletePostBtn';
import SocialActionBtn from './SocialActionbtn';

interface PostCardProps {
  post: Post;
  onDelete?: () => void;
  onOpenPost?: () => void;
}

const PostCard = ({
  post,
  onDelete,
  onOpenPost,
}: PostCardProps) => {

  return (
    <div
      className="group relative bg-card border border-border/60 rounded-xl p-6 hover:bg-card/90 shadow-sm hover:shadow-md hover:border-border hover-effect"
    >
      {
        onDelete && <DeletePostBtn onDelete={onDelete} />
      }
      <div className="flex flex-col lg:flex-row gap-6">
        <button
          className="inline-flex lg:flex-col items-center gap-4 lg:px-2 group/profile w-30"
        >
          <Image
            src={"/user.jpg"}
            alt='avator'
            width={60}
            height={60}
            className='rounded-full'
          />
          <h3 className="font-semibold text-sm tracking-tight cursor-pointer group-hover/profile:underline group-hover/profile:text-social-indigo hover-effect">
            {post.user.username}
          </h3>
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-1.5 text-xs text-social-green font-semibold">
            <Clock size={16} />
            <span>
              {formatRelative(post.created, new Date())}
            </span>
          </div>

          <p className="my-6 text-[15px] leading-relaxed wrap-break-word font-light text-card-foreground/80">
            {post.content}
          </p>

          <div className="flex items-center gap-12 border-t border-border pt-5 text-foreground/70">
            <SocialActionBtn
              icon={<Heart size={20} />}
              count={8}
              className="hover:text-pink-500"
            />
            <SocialActionBtn
              icon={<MessageCircle size={20} />}
              count={post.comments.length}
              className="hover:text-blue-500"
              onClick={onOpenPost}
            />
            {/* <SocialActionBtn */}
            {/*   icon={<Share2 size={20} />} */}
            {/*   label="Share" */}
            {/*   className="hover:text-green-500" */}
            {/* /> */}
          </div>
        </div>
      </div>
    </div >
  );
};

export default PostCard;
