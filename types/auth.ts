export interface LoginUser {
  username: string;
  password: string;
}

export interface ResponseUser {
  id: number;
  name: string;
  username: string;
}

export interface LoginResponse {
  user: ResponseUser,
  accessToken: string,
}

export interface RefreshResponse {
  data: string;
}
