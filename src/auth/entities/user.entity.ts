import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { Review } from 'src/reviews/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  @Expose()
  id: string;

  @Column({ unique: true })
  @Field()
  @Expose()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  @Field()
  @Expose()
  createdAt: Date;

  @OneToMany((type) => Review, (review) => review.user)
  @Field((type) => [Review], { nullable: true })
  reviews?: Review[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
