export interface User {
  id: number;
  name: string;
  username: string;
  image: string | null;
  bio: string | null;
  password: string;
  refreshToken: string;
  created: string;
  posts: any[];
  comments: any[];
}
