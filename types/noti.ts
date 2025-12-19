import { Post } from "./post";
import { User } from "./user";

export interface Noti {
  id: number;
  type: string;
  content: string;
  user: User;
  userId: number;
  post: Post;
  postId: number;
  read: Boolean;
  created: string;
}
