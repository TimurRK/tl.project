import { Module } from '@nestjs/common';

import { ParserService } from './parser.servise';

@Module({
  imports: [],
  providers: [ParserService],
  exports: [ParserService],
})
export class ParserModule {}
