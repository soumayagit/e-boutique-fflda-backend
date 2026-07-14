import { PrismaService } from '../../../../../prisma/prisma.service';
import { AddCartItemDto, UpdateCartItemDto } from '../dto/cart.dto';
export declare class CartService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getOrCreateCart(userId: string): Promise<{
        id: any;
        itemCount: any;
        items: any;
        total: number;
        shippingCost: number;
        totalWithShipping: number;
    }>;
    addItem(userId: string, dto: AddCartItemDto): Promise<{
        id: any;
        itemCount: any;
        items: any;
        total: number;
        shippingCost: number;
        totalWithShipping: number;
    }>;
    updateItem(userId: string, itemId: string, dto: UpdateCartItemDto): Promise<{
        id: any;
        itemCount: any;
        items: any;
        total: number;
        shippingCost: number;
        totalWithShipping: number;
    }>;
    removeItem(userId: string, itemId: string): Promise<{
        id: any;
        itemCount: any;
        items: any;
        total: number;
        shippingCost: number;
        totalWithShipping: number;
    }>;
    clearCart(userId: string): Promise<{
        id: any;
        itemCount: any;
        items: any;
        total: number;
        shippingCost: number;
        totalWithShipping: number;
    }>;
    private formatCart;
}
