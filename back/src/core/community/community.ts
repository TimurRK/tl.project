import { Module } from '@nestjs/common';

import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [BookmarkModule],
  providers: [],
  exports: [BookmarkModule],
})
export class CommunityModule {}
