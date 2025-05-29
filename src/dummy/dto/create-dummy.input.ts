import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDummyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
