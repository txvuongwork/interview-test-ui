import type { TUser } from "./user";

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  token: string;
  tokenType: string;
  user: TUser;
  message: string;
};
