import { UsersService } from '../application/use-cases/users.service';
import { UpdateProfileDto } from '../application/dtos/update-profile.dto';
import { UpdatePasswordDto } from '../application/dtos/update-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: any): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        id: string;
        role: import("@prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    updateProfile(user: any, dto: UpdateProfileDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        id: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    updatePassword(user: any, dto: UpdatePasswordDto): Promise<{
        message: string;
    }>;
}
