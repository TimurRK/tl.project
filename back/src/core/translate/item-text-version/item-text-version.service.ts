import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { CreateItemTextVersionDTO } from './mutation-input/create.dto';
import { UpdateItemTextVersionDTO } from './mutation-input/update.dto';
import { ItemTextVersion } from './item-text-version.entity';

@Injectable()
export class ItemTextVersionService {
  constructor(private readonly dataSource: DataSource) {}

  public async create(data: CreateItemTextVersionDTO) {
    if (data.is_main) {
      await this.dataSource.getRepository(ItemTextVersion).update({ item_text_id: data.item_text_id }, { is_main: false });
    }

    return await this.dataSource.getRepository(ItemTextVersion).save(data);
  }

  public async update(id: string, data: UpdateItemTextVersionDTO) {
    const item_text_version = await this.dataSource.getRepository(ItemTextVersion).findOne({ where: { id } });

    if (data.is_main) {
      await this.dataSource.getRepository(ItemTextVersion).update({ item_text_id: item_text_version.item_text_id }, { is_main: false });
    }

    await this.dataSource.getRepository(ItemTextVersion).update(id, data);

    item_text_version.value = data.value;
    item_text_version.is_main = data.is_main;

    return item_text_version;
  }
}
