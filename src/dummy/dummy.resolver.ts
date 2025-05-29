import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DummyService } from './dummy.service';
import { Dummy } from './entities/dummy.entity';
import { CreateDummyInput } from './dto/create-dummy.input';
import { UpdateDummyInput } from './dto/update-dummy.input';

@Resolver(() => Dummy)
export class DummyResolver {
  constructor(private readonly dummyService: DummyService) {}

  @Mutation(() => Dummy)
  createDummy(@Args('createDummyInput') createDummyInput: CreateDummyInput) {
    return this.dummyService.create(createDummyInput);
  }

  @Query(() => [Dummy], { name: 'dummy' })
  findAll() {
    return this.dummyService.findAll();
  }

  @Query(() => Dummy, { name: 'dummy' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dummyService.findOne(id);
  }

  @Mutation(() => Dummy)
  updateDummy(@Args('updateDummyInput') updateDummyInput: UpdateDummyInput) {
    return this.dummyService.update(updateDummyInput.id, updateDummyInput);
  }

  @Mutation(() => Dummy)
  removeDummy(@Args('id', { type: () => Int }) id: number) {
    return this.dummyService.remove(id);
  }
}
