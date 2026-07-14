import { PrismaService } from '../../../../prisma/prisma.service';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        id: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        id: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    updatePassword(userId: string, dto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
}
