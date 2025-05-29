import { Injectable } from '@nestjs/common';
import { CreateDummyInput } from './dto/create-dummy.input';
import { UpdateDummyInput } from './dto/update-dummy.input';

@Injectable()
export class DummyService {
  create(createDummyInput: CreateDummyInput) {
    return 'This action adds a new dummy';
  }

  findAll() {
    return `This action returns all dummy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dummy`;
  }

  update(id: number, updateDummyInput: UpdateDummyInput) {
    return `This action updates a #${id} dummy`;
  }

  remove(id: number) {
    return `This action removes a #${id} dummy`;
  }
}
