import { Module } from '@nestjs/common';
import { DummyService } from './dummy.service';
import { DummyResolver } from './dummy.resolver';

@Module({
  providers: [DummyResolver, DummyService],
})
export class DummyModule {}
