import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { RestLogger } from '../../logger/logger.decorator';
import { LoggerStore } from '../../logger/logger.store';
import { mimetype_not_allowed } from '../../errors';
import { RestUser } from '../oauth/user/user.decorator';
import { IJwtPayload } from '../oauth/user/user.entity';
import { ParserService } from '../parser/parser.servise';

export enum EMimeType {
  EPUB = 'application/epub+zip',
}

@Controller('uploads')
export class UploadController {
  constructor(private readonly parserService: ParserService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  public async upload(@RestUser() current_user: IJwtPayload, @RestLogger() logger_store: LoggerStore, @UploadedFile() file: IFile) {
    if (!Object.values(EMimeType).includes(file.mimetype as EMimeType)) {
      mimetype_not_allowed({ raise: true });
    }

    return await this.parserService.parse(file, logger_store, current_user);
  }
}
