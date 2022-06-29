import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { mimetype_not_allowed } from '../../errors';
import { ParserService } from '../parser/parser.servise';

export enum EMimeType {
  EPUB = 'application/epub+zip',
}

@Controller('uploads')
export class UploadController {
  constructor(private readonly parserService: ParserService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  public async upload(@UploadedFile() file: IFile) {
    if (!Object.values(EMimeType).includes(file.mimetype as EMimeType)) {
      mimetype_not_allowed({ raise: true });
    }

    return await this.parserService.parse(file);
  }
}
