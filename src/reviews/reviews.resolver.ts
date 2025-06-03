import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities';
import { JwtGuard } from 'src/auth/guards';
import { SerializeOptions, UseGuards } from '@nestjs/common';
import { CreateReviewInput, UpdateReviewInput } from './dto';
import { CurrentUser } from 'src/auth/decorators';

@Resolver((of) => Review)
@SerializeOptions({ type: Review })
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  @UseGuards(JwtGuard)
  async createReview(
    @CurrentUser('id') userId: string,
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ): Promise<Review> {
    return this.reviewsService.createReview(userId, createReviewInput);
  }

  @Query(() => [Review])
  async reviewsForResource(
    @Args('resourceUrl') resourceUrl: string,
  ): Promise<Review[]> {
    return this.reviewsService.getReviewsForResource(resourceUrl);
  }

  @Query(() => [Review])
  async reviewsCreatedByUser(
    @Args('userId') userId: string,
  ): Promise<Review[]> {
    return this.reviewsService.getReviewsCreatedByUser(userId);
  }

  @Query(() => Review)
  async reviewById(@Args('reviewId') reviewId: string): Promise<Review> {
    return this.reviewsService.getReviewById(reviewId);
  }

  @Mutation(() => Review)
  @UseGuards(JwtGuard)
  async updateReview(
    @CurrentUser('id') userId: string,
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ): Promise<Review> {
    return this.reviewsService.updateReview(userId, updateReviewInput);
  }

  @Mutation(() => Review)
  @UseGuards(JwtGuard)
  async deleteReview(
    @CurrentUser('id') userId: string,
    @Args('reviewId') reviewId: string,
  ): Promise<Review> {
    return this.reviewsService.deleteReview(userId, reviewId);
  }
}
