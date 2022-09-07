import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemTextVersion } from './item-text-version.entity';
import { ItemTextVersionResolver } from './item-text-version.resolver';
import { ItemTextVersionService } from './item-text-version.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemTextVersion])],
  providers: [ItemTextVersionResolver, ItemTextVersionService],
  exports: [],
})
export class ItemTextVersionModule {}
