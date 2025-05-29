import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
