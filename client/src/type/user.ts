export interface IUser{
    userId: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    isActive?: boolean;
    role: "admin" | "user";
    iat?: number;
    exp?: number;
   
}