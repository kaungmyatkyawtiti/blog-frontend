import { Heart } from 'lucide-react';
import Image from 'next/image';
import { formatRelative } from "date-fns"
import { Button } from './ui/button';
import { MockComment, mockComments } from '@/utils/constants';
import ActionButton from './SocialActionbtn';
import SocialActionBtn from './SocialActionbtn';

interface CommentItemProps {
  comment: MockComment;
}

export function CommentItem({
  comment,
}: CommentItemProps) {
  return (
    <div
      className="flex gap-4 p-5 border-b border-border last:border-b-0 hover:bg-card hover-effect"
    >
      <Image
        src={comment.user.image || "/user.jpg"}
        alt='avator'
        width={40}
        height={40}
        className='rounded-full h-10 w-10 object-cover'
      />

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">
            {comment.user.username}
          </h4>
          <span className="text-xs text-muted-foreground">
            {formatRelative(comment.created, new Date())}
          </span>
        </div>

        <p className="text-sm text-card-foreground/75 leading-relaxed mb-4">
          {comment.content}
        </p>

        <div className="flex items-center gap-8 text-foreground/70">
          <SocialActionBtn
            icon={<Heart size={14} />}
            label={"Like"}
            className={"hover:text-pink-500"}
          />
          <button className="text-[13px] font-medium hover:underline hover:text-social-indigo">
            Reply
          </button>
        </div>
      </div>
    </div>
  )
}

const PostComments = () => {
  return (
    <div className="mx-auto mt-10 space-y-8">
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-primary">
          Add a Comment
        </h3>
        <textarea
          placeholder="Write your insightful comment..."
          rows={3}
          className="w-full p-3 text-sm border border-border rounded-lg bg-input/80 focus:border-social-indigo focus:ring-social-indigo focus:ring-1 resize-none outline-none transition duration-200 text-foreground"
        />
        <div className="flex justify-end">
          <Button
            size={'sm'}
            type="submit"
            className="bg-social-indigo text-white hover:bg-social-indigo/90"
          >
            Comment
          </Button>
        </div>
      </div>

      <div className="">
        <h3 className="text-lg font-bold mb-6 text-primary">
          Comments ({mockComments.length})
        </h3>

        <div>
          {
            mockComments.map(comment =>
              <CommentItem key={comment.id} comment={comment} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default PostComments;
