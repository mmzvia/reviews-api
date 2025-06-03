import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;
}
