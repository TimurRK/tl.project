import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionVersion } from './section-version.entity';
import { SectionVersionResolver } from './section-version.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SectionVersion])],
  providers: [SectionVersionResolver],
  exports: [],
})
export class SectionVersionModule {}
