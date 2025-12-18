import { Comment } from "./comment";
import { Post } from "./post";

export interface User {
  id: number;
  name: string;
  username: string;
  image: string | null;
  bio: string | null;
  password: string;
  refreshToken: string;
  created: string;
  posts: Post[];
  comments: Comment[];
  followers: Follow[];
  followings: Follow[];
}

export interface Follow {
  id: number;
  followerId: number;
  followingId: number,
  created: string;
}
