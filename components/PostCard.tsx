"use client";

import { Post } from '@/types/post';
import DeletePostBtn from './DeletePostBtn';
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import ContentBox from './ContentBox';
import { useMutationDeletePost, useMutationLikePost, useMutationUnlikePost } from '@/hooks/postHook';
import { useRouter } from "next/navigation";
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

interface PostCardProps {
  post: Post;
}

const PostCard = ({
  post,
}: PostCardProps) => {
  const { showNoti } = useBoundStore();

  const { mutateAsync: deletePost, isSuccess: deleteSuccess } = useMutationDeletePost();
  const { mutateAsync: likePost, isSuccess: likeSuccess } = useMutationLikePost();
  const { mutateAsync: unlikePost, isSuccess: unlikeSuccess } = useMutationUnlikePost();

  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deletePost(post);
      console.log("Delete post success from post card");
      showNoti("Successfully deleted post!")
    } catch (err) {
      console.log("Delete post error from post card action", err);
      showNoti("Failed to delete post!")
    }
  }

  const handleOpenCmt = () => {
    console.log("post", post);
    router.push(`/posts/${post.id}`)
  }

  const handleLike = async () => {
    try {
      const result = await likePost(post);
      console.log("Like post success from post card", result);
      showNoti("You liked the post!")
    } catch (err) {
      console.log("Like post error from post card action", err);
      showNoti("Like the post failed!")
    }
  }

  const handleUnike = async () => {
    try {
      await unlikePost(post);
      console.log("Unlike post success from post card");
      showNoti("You unliked the post!")
    } catch (err) {
      console.log("Unlike post error from post card action", err);
      showNoti("Unlike the post failed!")
    }
  }

  const handleLikedList = () => {
    console.log("see who likes this post");
    router.push(`/likes/posts/${post.id}`);
  }

  const handleMentedList = () => {
    console.log("see who commented this post");
  }

  const user = useBoundStore(state => state.user);

  const isLiked = !!(user && post.likes.some(like => like.userId === user.id));

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
      <ContentBox
        avatar={post.user.image}
        username={post.user.username}
        created={post.created}
        content={post.content}
      />

      <div className="flex items-center justify-end gap-16 border-t border-border pt-6 text-foreground/70">
        <LikeButton
          onLike={handleLike}
          onUnlike={handleUnike}
          isLiked={isLiked}
          count={post.likes.length}
          onLikedList={handleLikedList}
        />
        <CommentButton
          onOpenCmt={handleOpenCmt}
          count={post.comments.length}
        />
      </div>
    </div>
  );
};

export default PostCard;
