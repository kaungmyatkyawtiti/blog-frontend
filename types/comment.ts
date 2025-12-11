import { User } from "./user";

export interface CommentLike {
  id: number;
  commentId: number;
  userId: number;
  created: string;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  likes: CommentLike[];
  user: User;
  created: string;
}

export interface NewComment {
  content: string;
}
