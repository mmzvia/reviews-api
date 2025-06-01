import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field()
  resourceUrl: string;

  @Field((type) => Int)
  @Min(1)
  @Max(5)
  rating: number;

  @Field()
  comment: string;
}
