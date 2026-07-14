export declare enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    SUPPORT = "SUPPORT",
    CUSTOMER = "CUSTOMER"
}
export declare class UserEntity {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    role: Role;
    isActive: boolean;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    get fullName(): string;
    isAdmin(): boolean;
    hasRole(...roles: Role[]): boolean;
}
