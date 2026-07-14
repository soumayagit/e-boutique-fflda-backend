export declare class UserEntity {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: string;
    createdAt: Date;
    static fromPrisma(user: any): UserEntity;
}
