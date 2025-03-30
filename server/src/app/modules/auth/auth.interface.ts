import { UserRole } from "../user/user.interface";


export type TTokenResponse = {
  name: string;
  email: string;
  role: string;
  userId: string;
  iat: number;
  exp: number;
};

export interface IAuth {
  email: string;
  password: string;
}

export interface IJwtPayload {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  isBlocked: boolean;
}