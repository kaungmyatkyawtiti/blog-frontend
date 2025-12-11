import { User } from "./user";
import { Comment } from "./comment";

export interface PostLike {
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
  comments: Comment[];
  likes: PostLike[];
  created: string;
}

export interface NewPost {
  content: string;
}

export type NewPostLike = Omit<PostLike, "id">;
