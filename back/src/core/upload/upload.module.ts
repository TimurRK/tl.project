import { forwardRef, Module } from '@nestjs/common';

import { LoggerService } from '../../logger/logger.service';
import { ParserModule } from '../parser/parser.module';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [forwardRef(() => ParserModule)],
  providers: [
    UploadService,
    {
      provide: LoggerService,
      useValue: new LoggerService('UploadModule'),
    },
  ],
  controllers: [UploadController],
  exports: [UploadService],
})
export class UploadModule {}
