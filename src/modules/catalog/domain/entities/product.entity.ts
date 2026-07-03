export class ProductEntity {
  id:            string;
  name:          string;
  description?:  string;
  price:         number;
  stock:         number;
  imageUrl?:     string;
  isActive:      boolean;
  categoryId:    string;
  categoryName?: string | null; // ← ajout
  createdAt:     Date;
  updatedAt:     Date;
  variants?:     any[];
  largeur?:      number | null;
  longueur?:     number | null;
  epaisseur?:    number | null;
}