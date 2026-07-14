import { PrismaService } from '../../../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewOutput, ReviewStats } from '../domain/review.interface';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByProduct(productId: string): Promise<ReviewOutput[]>;
    create(productId: string, userId: string, dto: CreateReviewDto): Promise<ReviewOutput>;
    getStats(productId: string): Promise<ReviewStats>;
}
