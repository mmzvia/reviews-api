import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  IsOptional,
  IsUrl,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class UpdateReviewInput {
  @Field((type) => ID)
  @IsUUID()
  reviewId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  resourceUrl?: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  content?: string;
}
