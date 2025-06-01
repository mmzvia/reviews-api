import { Injectable } from '@nestjs/common';
import { Review } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewInput, UpdateReviewInput } from './dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: ReviewsService,
  ) {}

  createReview(userId: string, input: CreateReviewInput): Promise<Review> {}

  getReviewsByResourceUrl(url: string): Promise<Review[]> {}

  getReviewsByUserId(id: string): Promise<Review[]> {}

  getReviewById(id: string): Promise<Review> {}

  updateReviewById(userId: string, input: UpdateReviewInput): Promise<Review> {}

  deleteReviewById(userId: string, id: string): Promise<Review> {}
}
