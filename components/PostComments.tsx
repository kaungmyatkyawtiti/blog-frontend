"use client"

import { Heart } from 'lucide-react';
import Image from 'next/image';
import { formatRelative } from "date-fns"
import { Button } from './ui/button';
import SocialActionBtn from './SocialActionbtn';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/useMobile';
import { Comment } from '@/types/comment';
import { useMutationCreateComment, useMutationDeleteComment, useMutationLikeComment, useMutationUnlikeComment } from '@/hooks/commentHook';
import { useBoundStore } from '@/lib/hooks/useBoundStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { commentSchema } from '@/lib/schemas';
import { Post } from '@/types/post';
import DeletePostBtn from './DeletePostBtn';

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({
  comment
}: CommentItemProps) {
  const isMobile = useIsMobile();

  const { showNoti } = useBoundStore();

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

  const isLiked = user && comment.likes.some(like => like.userId === user.id);

  const isOwner = user && user.id === comment.user.id;

  return (
    <div
      className="p-5 gap-6 border-b border-border last:border-b-0 hover:bg-card hover-effect relative group"
    >
      {
        isOwner &&
        <DeletePostBtn
          onDelete={handleDelete}
          title={"Delete The Comment."}
        />
      }
      <div
        className={cn(
          "flex gap-8",
          isMobile && "flex-col gap-4"
        )}
      >
        <Image
          src={comment.user.image || "/logo.jpg"}
          alt={comment.user.username}
          width={40}
          height={40}
          className="rounded-full h-12 w-12 object-cover"
        />
        <div className="flex-1 flex flex-col gap-2">
          <h4 className="font-medium">
            {comment.user.name}
          </h4>
          <span className="text-xs text-muted-foreground">
            {formatRelative(comment.created, new Date())}
          </span>

          <p
            className="my-6 text-sm text-card-foreground/75 leading-relaxed mb-4">
            {comment.content}
          </p>

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
            count={comment.likes.length}
            className='ml-auto text-foreground/70'
            onClick={isLiked ? handleUnike : handleLike}
          />
        </div>
      </div>
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
            rows={3}
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
