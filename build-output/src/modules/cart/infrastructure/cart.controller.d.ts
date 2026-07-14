import { CartService } from '../application/use-cases/cart.service';
import { AddCartItemDto, UpdateCartItemDto } from '../application/dto/cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<{
        id: any;
        itemCount: any;
        items: any;
        total: number;
        shippingCost: number;
        totalWithShipping: number;
    }>;
    addItem(req: any, dto: AddCartItemDto): Promise<{
        id: any;
        itemCount: any;
        items: any;
        total: number;
        shippingCost: number;
        totalWithShipping: number;
    }>;
    addItemWithPlan(req: any, file: Express.Multer.File, body: any): Promise<{
        id: any;
        itemCount: any;
        items: any;
        total: number;
        shippingCost: number;
        totalWithShipping: number;
    }>;
    updateItem(req: any, id: string, dto: UpdateCartItemDto): Promise<{
        id: any;
        itemCount: any;
        items: any;
        total: number;
        shippingCost: number;
        totalWithShipping: number;
    }>;
    removeItem(req: any, id: string): Promise<{
        id: any;
        itemCount: any;
        items: any;
        total: number;
        shippingCost: number;
        totalWithShipping: number;
    }>;
    clearCart(req: any): Promise<{
        id: any;
        itemCount: any;
        items: any;
        total: number;
        shippingCost: number;
        totalWithShipping: number;
    }>;
}
