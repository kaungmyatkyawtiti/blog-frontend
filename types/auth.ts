export interface LoginUser {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  username: string;
}

export interface RefreshResponse {
  data: string;
}
