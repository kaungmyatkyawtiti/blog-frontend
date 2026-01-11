"use client";

import { Post } from '@/types/post';
import DeletePostBtn from './DeletePostBtn';
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import ContentBox from './ContentBox';
import { useMutationDeletePost } from '@/hooks/postHook';
import CommentButton from './CommentButton';
import LikeButton from './LikeButton';
import Link from 'next/link';
import { toast } from 'sonner';

interface PostCardProps {
  post: Post;
}

const PostCard = ({
  post,
}: PostCardProps) => {
  const showLatest = useBoundStore(state => state.showLatest);
  const { mutateAsync: deletePost, isSuccess: deleteSuccess } = useMutationDeletePost(showLatest);

  const handleDelete = async () => {
    try {
      await deletePost(post);
      console.log("Delete post success from post card");
      toast.success("Successfully deleted post.");
    } catch (err) {
      console.log("Delete post error from post card action", err);
      toast.error("Failed to delete post.");
    }
  }

  const user = useBoundStore(state => state.user);

  const isOwner = user && user.id === post.user.id;

  return (
    <div
      className="group relative bg-card border border-border/60 rounded-xl p-5 hover:bg-card/90 shadow-sm hover:shadow-md hover:border-border hover-effect"
    >
      {
        isOwner &&
        <DeletePostBtn
          onDelete={handleDelete}
          title={"Delete The Post."}
        />
      }
      {/* <ContentBox */}
      {/*   avatar={post.user.image} */}
      {/*   username={post.user.username} */}
      {/*   created={post.created} */}
      {/*   content={post.content} */}
      {/* /> */}

      <ContentBox item={post} />

      <div className="flex items-center justify-end gap-16 border-t border-border pt-6 text-foreground/70">
        <LikeButton
          item={post}
          type={"post"}
        />

        <Link href={`/posts/${post.id}`}>
          <CommentButton count={post.comments.length} />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
