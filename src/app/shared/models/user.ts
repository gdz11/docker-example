
export interface User
{
    id: string;
    email: string;
    userType: UserType;
}

export enum UserType {
    Admin = 1,
    Customer = 2
}

export interface AuthResult
{
    accessToken: string;
    user: User;
}