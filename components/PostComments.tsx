"use client"

import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Comment } from '@/types/comment';
import { useMutationCreateComment, useMutationDeleteComment, useMutationLikeComment, useMutationUnlikeComment } from '@/hooks/commentHook';
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { commentSchema } from '@/lib/schemas';
import { Post } from '@/types/post';
import DeletePostBtn from './DeletePostBtn';
import LikeButton from './LikeButton';
import ContentBox from './ContentBox';
import { useRouter } from 'next/navigation';

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({
  comment
}: CommentItemProps) {
  const { showNoti } = useBoundStore();

  const router = useRouter();

  const { mutateAsync: likeComment, isSuccess: likeSuccess } = useMutationLikeComment();
  const { mutateAsync: unlikeComment, isSuccess: unlikeSuccess } = useMutationUnlikeComment();
  const { mutateAsync: deleteComment, isSuccess: deleteSuccess } = useMutationDeleteComment();

  const user = useBoundStore(state => state.user);

  const handleLike = async () => {
    try {
      const result = await likeComment(comment);
      console.log("Like comment success from post comments", result);
      showNoti("You liked the comment!")
    } catch (err) {
      console.log("Like post error from post comments", err);
      showNoti("Like the comment failed!")
    }
  }

  const handleUnike = async () => {
    try {
      await unlikeComment(comment);
      console.log("Unlike comment success from post comments");
      showNoti("You unliked the comment!")
    } catch (err) {
      console.log("Unlike comment error from post comments", err);
      showNoti("Unlike the comment failed!")
    }
  }

  const handleDelete = async () => {
    try {
      await deleteComment(comment);
      console.log("Delete comment success from post comments");
      showNoti("Successfully deleted the comment!")
    } catch (err) {
      console.log("Delete comment error from post comments", err);
      showNoti("Failed to delete comment!")
    }
  }

  const handleLikedList = () => {
    router.push(`/likes/comments/${comment.id}`);
    console.log("see who likes this comment");
  }

  const isLiked = !!(user && comment.likes.some(like => like.userId === user.id));

  const isOwner = user && user.id === comment.user.id;

  return (
    <div
      className="p-4 border-b border-border last:border-b-0 hover:bg-card hover-effect relative group"
    >
      {
        isOwner &&
        <DeletePostBtn
          onDelete={handleDelete}
          title={"Delete The Comment."}
        />
      }
      <ContentBox
        avatar={comment.user.image}
        username={comment.user.username}
        created={comment.created}
        content={comment.content}
        avatarSize={50}
      />
      <LikeButton
        onLike={handleLike}
        onUnlike={handleUnike}
        isLiked={isLiked}
        count={comment.likes.length}
        onLikedList={handleLikedList}
        className='flex justify-end'
      />
    </div>
  )
}

interface PostCommentProps {
  post: Post;
}

type CommentFormSchema = z.infer<typeof commentSchema>;

const PostComments = ({ post }: PostCommentProps) => {
  const { mutateAsync: createComment, isSuccess } = useMutationCreateComment();

  const { showNoti } = useBoundStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: ""
    }
  })

  const onSubmit: SubmitHandler<CommentFormSchema> = async (data) => {
    try {
      const newOne = {
        content: data.content,
        postId: post.id
      }
      const result = await createComment(newOne);
      console.log("Create comment success from post comments", result);
      showNoti("You commented this post!")
    } catch (err) {
      console.log("Create comment error from post comments", err);
      showNoti("Failed to comment!")
    } finally {
      reset();
    }
  }

  return (
    <div className="mx-auto mt-10 space-y-8">
      <form
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-lg font-semibold text-primary">
          Add a Comment
        </h3>
        <div>
          <textarea
            placeholder="Write your insightful comment..."
            rows={5}
            className={cn(
              "post-input hover-effect mb-2",
              errors.content && "error"
            )}
            {...register("content")}
          />
          {
            errors.content &&
            <p className="font-medium text-destructive ps-2 text-sm">{errors.content.message}</p>
          }

        </div>
        <div className="flex justify-end">
          <Button
            size={'sm'}
            type="submit"
            className="bg-social-indigo text-white hover:bg-social-indigo/90"
          >
            Comment
          </Button>
        </div>
      </form>

      <div className="">
        <h3 className="text-lg font-bold mb-6 text-primary">
          Comments ({post.comments.length})
        </h3>
        {
          post.comments.map(comment =>
            <CommentItem
              key={comment.id}
              comment={comment}
            />
          )
        }
      </div>
    </div>
  );
};

export default PostComments;
