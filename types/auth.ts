export interface RegisterUser {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface AuthUserResponse {
  id: number;
  name: string;
  username: string;
}

export interface RefreshResponse {
  data: string;
}
