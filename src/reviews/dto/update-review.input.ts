import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsUrl, Max, MaxLength, Min } from 'class-validator';

@InputType()
export class UpdateReviewInput {
  @Field((type) => ID)
  reviewId: string;

  @Field({ nullable: true })
  @IsUrl()
  resourceUrl?: string;

  @Field((type) => Int, { nullable: true })
  @Min(1)
  @Max(5)
  rating?: number;

  @Field({ nullable: true })
  @MaxLength(255)
  comment?: string;
}
