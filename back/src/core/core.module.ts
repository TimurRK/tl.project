import { Module } from '@nestjs/common';

import { OAuthModule } from './oauth/oauth.module';
import { ParserModule } from './parser/parser.module';
import { TranslateModule } from './translate/translate.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [OAuthModule, TranslateModule, UploadModule, ParserModule],
  providers: [],
  exports: [OAuthModule, TranslateModule, UploadModule, ParserModule],
})
export class CoreModule {}
