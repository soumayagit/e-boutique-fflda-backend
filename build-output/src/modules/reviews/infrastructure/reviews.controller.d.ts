import { ReviewsService } from '../application/reviews.service';
import { CreateReviewDto } from '../application/dto/create-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    findAll(productId: string): Promise<import("../domain/review.interface").ReviewOutput[]>;
    getStats(productId: string): Promise<import("../domain/review.interface").ReviewStats>;
    create(productId: string, dto: CreateReviewDto, req: any): Promise<import("../domain/review.interface").ReviewOutput>;
}
