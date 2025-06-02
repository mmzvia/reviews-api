import { Field, InputType, Int } from '@nestjs/graphql';
import { IsUrl, Max, MaxLength, Min } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field()
  @IsUrl()
  resourceUrl: string;

  @Field((type) => Int)
  @Min(1)
  @Max(5)
  rating: number;

  @Field()
  @MaxLength(255)
  comment: string;
}
