import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { User } from 'src/auth/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID, { nullable: true })
  @Expose()
  id: string;

  @Column()
  @Field()
  @Expose()
  resourceUrl: string;

  @Column()
  @Field((type) => Int)
  @Expose()
  rating: number;

  @Column()
  @Field()
  @Expose()
  content: string;

  @CreateDateColumn()
  @Field()
  @Expose()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  @Expose()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.id)
  @Field(() => User)
  @Expose()
  user: User;

  constructor(partial: Partial<Review>) {
    Object.assign(this, partial);
  }
}
