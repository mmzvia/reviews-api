import { CreateDummyInput } from './create-dummy.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDummyInput extends PartialType(CreateDummyInput) {
  @Field(() => Int)
  id: number;
}
