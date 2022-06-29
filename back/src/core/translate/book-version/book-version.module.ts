import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookVersion } from './book-version.entity';
import { BookVersionResolver } from './book-version.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BookVersion])],
  providers: [BookVersionResolver],
  exports: [],
})
export class BookVersionModule {}
