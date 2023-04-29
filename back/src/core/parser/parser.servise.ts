import { Injectable } from '@nestjs/common';

import { DataSource, DeepPartial } from 'typeorm';
import { parseEpub } from 'epub-parser-simple';
import { v4 } from 'uuid';
import sharp from 'sharp';

import { LoggerStore } from '../../logger/logger.store';
import { Book, EBookStatus } from '../translate/book/book.entity';
import { ESectionStatus, Section } from '../translate/section/section.entity';
import { Item } from '../translate/item/item.entity';
import { ItemImage } from '../translate/item-image/item-image.entity';
import { ItemText } from '../translate/item-text/item-text.entity';
import { IJwtPayload } from '../oauth/user/user.entity';
import { Translator } from '../translate/translator/translator.entity';

export type TImageSize = 'small' | 'normal';

export const IMAGE_SIZES = {
  small: {
    w: 151,
    h: 212,
  },
  normal: {
    w: 495,
    h: 669,
  },
};

@Injectable()
export class ParserService {
  constructor(private readonly dataSource: DataSource) {}

  public async parse(file: IFile, logger_store: LoggerStore, current_user: IJwtPayload) {
    logger_store.addBaseCtx({ file_name: file.originalname, mimetype: file.mimetype, current_user_id: current_user.id });

    logger_store.info('ParserService: parse: start');

    const parsed_book = await parseEpub(file.buffer);

    const inserted_book = await this.dataSource.transaction(async (entityManager) => {
      const book: DeepPartial<Book> = {
        title: parsed_book.title,
        author: parsed_book.author,
        is_private: true,
        book_status: EBookStatus.QUEUE,
      };

      if (parsed_book.cover) {
        const parsed_cover = parsed_book.cover.parsed_data[0];

        if (parsed_cover?.base64?.length) {
          book.cover = await this.resizeImage(parsed_book.cover.parsed_data[0].base64, 'small');
        }
      }

      const { identifiers } = await entityManager.getRepository(Book).insert(book);

      book.id = identifiers[0].id as number;

      const translator: DeepPartial<Translator> = {
        book_id: book.id,
        user_id: current_user.id,
      };

      await entityManager.getRepository(Translator).insert(translator);

      const sections: Array<DeepPartial<Section>> = [];
      const items: Array<DeepPartial<Item>> = [];
      const images: Array<DeepPartial<ItemImage>> = [];
      const texts: Array<DeepPartial<ItemText>> = [];

      for await (const [section_index, parsed_section] of (parsed_book.sections || []).entries()) {
        const section: DeepPartial<Section> = {
          id: v4(),
          title: parsed_section.id,
          book_id: book.id,
          position: section_index,
          section_status: ESectionStatus.QUEUE,
        };

        let only_image = true;

        for await (const [item_index, parsed_item] of parsed_section.parsed_data.entries()) {
          const item: DeepPartial<Item> = {
            id: v4(),
            section_id: section.id,
            itemable_id: v4(),
            position: item_index,
          };

          if (parsed_item.type === 'image') {
            item.itemable_type = 'ItemImage';

            const image: DeepPartial<ItemImage> = {
              id: item.itemable_id,
            };

            if (parsed_item.base64) {
              image.value = await this.resizeImage(parsed_item.base64, 'normal');
            }

            images.push(image);
          } else {
            item.itemable_type = 'ItemText';

            const text: DeepPartial<ItemText> = {
              id: item.itemable_id,
              value: parsed_item.value,
            };

            only_image = false;

            texts.push(text);
          }

          items.push(item);
        }

        if (only_image) {
          section.section_status = ESectionStatus.READY;
        }

        sections.push(section);
      }

      if (sections.length) {
        await entityManager.getRepository(Section).insert(sections);

        if (texts.length) {
          await entityManager.getRepository(ItemText).insert(texts);
        }

        if (images.length) {
          await entityManager.getRepository(ItemImage).insert(images);
        }

        if (items.length) {
          await entityManager.getRepository(Item).insert(items);
        }

        if (texts.length) {
          await entityManager.query(`
            UPDATE "item_text"
            SET item_id = t.item_id
            FROM (
              SELECT
                "item_text".id,
                "item".id AS item_id
              FROM "item_text"
              LEFT JOIN "item"
                ON "item".itemable_id = "item_text".id
                AND "item".itemable_type = 'ItemText'
              LEFT JOIN "section"
                ON "section".id = "item".section_id
              WHERE "item_text".item_id IS NULL
                AND "item".id IS NOT NULL
                AND "section".book_id = '${book.id}'
            ) AS t
            WHERE t.id = "item_text".id
          `);
        }

        if (images.length) {
          await entityManager.query(`
            UPDATE "item_image"
            SET item_id = t.item_id
            FROM (
              SELECT
                "item_image".id,
                "item".id AS item_id
              FROM "item_image"
              LEFT JOIN "item"
                ON "item".itemable_id = "item_image".id
                AND "item".itemable_type = 'ItemImage'
              LEFT JOIN "section"
                ON "section".id = "item".section_id
              WHERE "item_image".item_id IS NULL
                AND "item".id IS NOT NULL
                AND "section".book_id = '${book.id}'
            ) AS t
            WHERE t.id = "item_image".id
          `);
        }
      }

      return book;
    });

    logger_store.info('ParserService: parse: complete');

    return inserted_book;
  }

  private async resizeImage(base64_image: string, size_type: TImageSize) {
    const split_image = base64_image.split(';base64,');
    const buffer = Buffer.from(split_image[1], 'base64');

    const image_size = IMAGE_SIZES[size_type];

    const resize_buffer = await sharp(buffer)
      .resize(image_size.w, image_size.h, { fit: 'inside', withoutEnlargement: true })
      .toFormat('jpeg', { progressive: true, quality: 50 })
      .toBuffer();

    return `${split_image[0]};base64,${resize_buffer.toString('base64')}`;
  }
}
