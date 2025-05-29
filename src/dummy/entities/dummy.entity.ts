import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Dummy {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
