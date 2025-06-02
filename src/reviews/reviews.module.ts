import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsService } from './reviews.service';
import { User } from 'src/auth/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Review])],
  providers: [ReviewsResolver, ReviewsService],
})
export class ReviewsModule {}
