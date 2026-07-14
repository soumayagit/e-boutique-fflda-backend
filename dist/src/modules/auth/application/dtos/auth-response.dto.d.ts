export declare class UserResponseDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    emailVerified: boolean;
    createdAt: Date;
}
export declare class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    user: UserResponseDto;
}
export declare class TokensResponseDto {
    accessToken: string;
    refreshToken: string;
}
