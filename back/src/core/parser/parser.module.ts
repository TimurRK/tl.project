import { Module } from '@nestjs/common';

import { LoggerService } from '../../logger/logger.service';

import { ParserService } from './parser.servise';

@Module({
  imports: [],
  providers: [
    ParserService,
    {
      provide: LoggerService,
      useValue: new LoggerService('ParserModule'),
    },
  ],
  exports: [ParserService],
})
export class ParserModule {}
