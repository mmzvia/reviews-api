import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities';
import { JwtGuard } from 'src/auth/guards';
import { UseGuards } from '@nestjs/common';
import { CreateReviewInput, UpdateReviewInput } from './dto';
import { CurrentUser } from 'src/auth/decorators';

@Resolver((of) => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  @UseGuards(JwtGuard)
  createReview(
    @CurrentUser() userId: string,
    @Args('createReviewInput') input: CreateReviewInput,
  ): Promise<Review> {
    return this.reviewsService.createReview(userId, input);
  }

  @Query(() => [Review])
  getReviewsByResourceUrl(@Args('url') url: string): Promise<Review[]> {
    return this.reviewsService.getReviewsByResourceUrl(url);
  }

  @Query(() => [Review])
  getReviewsByUserId(@Args('id') id: string): Promise<Review[]> {
    return this.reviewsService.getReviewsByUserId(id);
  }

  @Query(() => Review)
  getReviewById(@Args('id') id: string): Promise<Review> {
    return this.reviewsService.getReviewById(id);
  }

  @Mutation(() => Review)
  @UseGuards(JwtGuard)
  updateReviewById(
    @CurrentUser('id') userId: string,
    @Args('input') input: UpdateReviewInput,
  ): Promise<Review> {
    return this.reviewsService.updateReviewById(userId, input);
  }

  @Mutation(() => Review)
  @UseGuards(JwtGuard)
  deleteReviewById(
    @CurrentUser('id') userId: string,
    @Args('id') reviewId: string,
  ): Promise<Review> {
    return this.reviewsService.deleteReviewById(userId, reviewId);
  }
}
