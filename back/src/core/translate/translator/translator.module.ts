import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Translator } from './translator.entity';
import { TranslatorResolver } from './translator.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Translator])],
  providers: [TranslatorResolver],
  exports: [],
})
export class TranslatorModule {}
