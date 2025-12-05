import { User } from "./user";

export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  user: User;
  created: string;
}
