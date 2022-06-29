import { Module } from '@nestjs/common';

import { BookVersionModule } from './book-version/book-version.module';
import { BookModule } from './book/book.module';
import { ItemImageModule } from './item-image/item-image.module';
import { ItemTextVersionModule } from './item-text-version/item-text-version.module';
import { ItemTextModule } from './item-text/item-text.module';
import { ItemModule } from './item/item.module';
import { SectionVersionModule } from './section-version/section-version.module';
import { SectionModule } from './section/section.module';
import { TranslatorModule } from './translator/translator.module';

@Module({
  imports: [
    BookModule,
    BookVersionModule,
    SectionModule,
    SectionVersionModule,
    ItemModule,
    ItemImageModule,
    ItemTextModule,
    ItemTextVersionModule,
    TranslatorModule,
  ],
  providers: [],
  controllers: [],
  exports: [
    BookModule,
    BookVersionModule,
    SectionModule,
    SectionVersionModule,
    ItemModule,
    ItemImageModule,
    ItemTextModule,
    ItemTextVersionModule,
    TranslatorModule,
  ],
})
export class TranslateModule {}
