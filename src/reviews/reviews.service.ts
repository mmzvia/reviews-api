import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Review } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewInput, UpdateReviewInput } from './dto';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  async createReview(
    userId: string,
    input: CreateReviewInput,
  ): Promise<Review> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newReview = this.reviewsRepository.create({
      ...input,
      user,
    });
    return await this.reviewsRepository.save(newReview);
  }

  async getReviewsForResource(resourceUrl: string): Promise<Review[]> {
    const reviews = await this.reviewsRepository.findBy({ resourceUrl });
    if (!reviews.length) {
      throw new NotFoundException(
        `No reviews found for resource URL: ${resourceUrl}`,
      );
    }
    return reviews;
  }

  async getReviewsCreatedByUser(userId: string): Promise<Review[]> {
    const reviews = await this.reviewsRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!reviews.length) {
      throw new NotFoundException(
        `No reviews found created by user with ID: ${userId}`,
      );
    }
    return reviews;
  }

  async getReviewById(reviewId: string): Promise<Review> {
    const review = await this.reviewsRepository.findOneBy({ id: reviewId });
    if (!review) {
      throw new NotFoundException(`No review found with ID: ${reviewId}`);
    }
    return review;
  }

  async updateReview(
    userId: string,
    input: UpdateReviewInput,
  ): Promise<Review> {
    const { reviewId } = input;
    const reviewToUpdate = await this.reviewsRepository.findOne({
      where: { id: reviewId },
      relations: ['user'],
    });
    if (!reviewToUpdate) {
      throw new NotFoundException(`No review found with ID: ${reviewId}`);
    }
    if (userId !== reviewToUpdate.user.id) {
      throw new ForbiddenException(`No permission to update this review`);
    }
    const updatedReview = await this.reviewsRepository.save({
      id: reviewId,
      ...input,
    });
    return updatedReview;
  }

  async deleteReview(userId: string, reviewId: string): Promise<Review> {
    const reviewToDelete = await this.reviewsRepository.findOne({
      where: { id: reviewId },
      relations: ['user'],
    });
    if (!reviewToDelete) {
      throw new NotFoundException(`No review found with ID: ${reviewId}`);
    }
    if (userId !== reviewToDelete.user.id) {
      throw new ForbiddenException(`No permission to delete this review`);
    }
    const deletedReview = await this.reviewsRepository.remove(reviewToDelete);
    return deletedReview;
  }
}
