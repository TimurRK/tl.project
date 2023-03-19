import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bookmark } from './bookmark.entity';
import { BookmarkResolver } from './bookmark.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark])],
  providers: [BookmarkResolver],
  exports: [],
})
export class BookmarkModule {}
