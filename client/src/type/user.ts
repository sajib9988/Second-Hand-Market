export interface IUser{
    userId: string;
    name: string;
    email: string;
    hasShop?: boolean;
    isActive?: boolean;
    role: "admin" | "user";
    iat?: number;
    exp?: number;
   
}