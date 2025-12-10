import { User } from "./user";
import { Comment } from "./comment";

export type PostComment = Omit<Comment, "user">;

interface PostLike {
  id: number;
  postId: number;
  userId: number;
  created: string;
}

export interface Post {
  id: number;
  content: string;
  userId: number;
  user: User;
  comments: PostComment[];
  likes: PostLike[];
  created: string;
}

export interface NewPost {
  content: string;
}
