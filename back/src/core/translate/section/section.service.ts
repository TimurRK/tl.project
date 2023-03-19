import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { not_found } from '../../../errors';

import { ESectionStatus, Section } from './section.entity';

@Injectable()
export class SectionService {
  constructor(private readonly dataSource: DataSource) {}

  public async changeStatus(id: number, section_status: ESectionStatus) {
    /**
     * @TODO check permissions
     */

    const res = await this.dataSource.getRepository(Section).update(id, { section_status });

    if (!res.affected) {
      not_found({ raise: true });
    }

    return {
      id,
      section_status,
    };
  }
}
