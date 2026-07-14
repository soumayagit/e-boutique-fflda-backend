import { WishlistService } from './wishlist.service';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    getWishlist(req: any): Promise<{
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
    addToWishlist(req: any, productId: string): Promise<{
        message: string;
    }>;
    removeFromWishlist(req: any, productId: string): Promise<{
        message: string;
    }>;
    checkWishlist(req: any, productId: string): Promise<boolean>;
}
