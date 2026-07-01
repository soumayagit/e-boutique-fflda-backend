export class ProductEntity {
  id:           string;
  name:         string;
  description?: string;
  price:        number;
  stock:        number;
  imageUrl?:    string;
  isActive:     boolean;
  categoryId:   string;
  createdAt:    Date;
  updatedAt:    Date;
  variants?:    any[];
  largeur?:     number | null; // ← ajout
  longueur?:    number | null; // ← ajout
  epaisseur?:   number | null; // ← ajout
}