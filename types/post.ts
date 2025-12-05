import { User } from "./user";
import { Comment } from "./comment";

export interface Post {
  id: number;
  content: string;
  userId: number;
  user: User;
  comments: Comment[];
  created: string;
}
