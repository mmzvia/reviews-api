import { Field, InputType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class UpdateReviewInput {
  @Field({ nullable: true })
  resourceUrl?: string;

  @Field({ nullable: true })
  @Min(1)
  @Max(5)
  rating: string;

  @Field({ nullable: true })
  comment: string;
}
