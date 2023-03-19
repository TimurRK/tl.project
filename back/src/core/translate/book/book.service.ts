import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { not_found } from '../../../errors';

import { Book, EBookStatus } from './book.entity';

@Injectable()
export class BookService {
  constructor(private readonly dataSource: DataSource) {}

  public async deleteBook(id: number) {
    /**
     * @TODO check permissions
     */

    const res = await this.dataSource.getRepository(Book).delete(id);

    if (!res.affected) {
      not_found({ raise: true });
    }

    return {
      id,
    };
  }

  public async changeStatus(id: number, book_status: EBookStatus) {
    /**
     * @TODO check permissions
     */

    const res = await this.dataSource.getRepository(Book).update(id, { book_status });

    if (!res.affected) {
      not_found({ raise: true });
    }

    return {
      id,
      book_status,
    };
  }

  public async changePrivate(id: number, is_private: boolean) {
    /**
     * @TODO check permissions
     */

    const res = await this.dataSource.getRepository(Book).update(id, { is_private });

    if (!res.affected) {
      not_found({ raise: true });
    }

    return {
      id,
      is_private,
    };
  }
}
