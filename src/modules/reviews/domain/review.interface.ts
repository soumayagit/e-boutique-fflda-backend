export interface ReviewOutput {
  id: string;
  rating: number;
  comment: string | null;
  date: Date;
  userName: string;
}

export interface ReviewStats {
  averageRating: number;
  reviewCount: number;
}