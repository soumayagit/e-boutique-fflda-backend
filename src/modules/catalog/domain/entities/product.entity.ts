export class ProductEntity {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  isActive: boolean;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  variants?: any[]
}