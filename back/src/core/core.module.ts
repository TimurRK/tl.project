import { Module } from '@nestjs/common';
import { CommunityModule } from './community/community';

import { OAuthModule } from './oauth/oauth.module';
import { ParserModule } from './parser/parser.module';
import { TranslateModule } from './translate/translate.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [OAuthModule, UploadModule, ParserModule, TranslateModule, CommunityModule],
  providers: [],
  exports: [OAuthModule, UploadModule, ParserModule, TranslateModule, CommunityModule],
})
export class CoreModule {}
