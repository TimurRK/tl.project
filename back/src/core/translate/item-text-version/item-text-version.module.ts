import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemTextVersion } from './item-text-version.entity';
import { ItemTextVersionResolver } from './item-text-version.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ItemTextVersion])],
  providers: [ItemTextVersionResolver],
  exports: [],
})
export class ItemTextVersionModule {}
