import { PrismaService } from '../../prisma/prisma.service';
export declare class WishlistService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getWishlist(userId: string): Promise<{
        id: string;
        createdAt: Date;
        product: {
            id: string;
            name: string;
            description: string | null;
            price: number;
            imageUrl: string | null;
            stock: number;
            category: string;
        };
    }[]>;
    addToWishlist(userId: string, productId: string): Promise<{
        message: string;
    }>;
    removeFromWishlist(userId: string, productId: string): Promise<{
        message: string;
    }>;
    isInWishlist(userId: string, productId: string): Promise<boolean>;
}
