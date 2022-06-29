import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemText } from './item-text.entity';
import { ItemTextResolver } from './item-text.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ItemText])],
  providers: [ItemTextResolver],
  exports: [],
})
export class ItemTextModule {}
