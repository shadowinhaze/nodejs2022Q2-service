import { HttpException } from '@nestjs/common';
import { Repository, DeepPartial } from 'typeorm';
import { ResCode, ResMsg } from './constants/constants';

export class CollectionItem<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne<Option>(findOption: Option): Promise<T> {
    const item = await this.repository.findOneBy(findOption);

    if (!item)
      throw new HttpException(`item ${ResMsg.notFound}`, ResCode.notFound);

    return item;
  }

  async addItem(dto: DeepPartial<T>): Promise<T> {
    const item = this.repository.create(dto);
    await this.repository.save(item);

    return item;
  }

  async updateItem<Option, UpdateDto>(
    findOption: Option,
    updateDto: UpdateDto,
  ): Promise<T> {
    await this.findOne(findOption);

    await this.repository.update(findOption, updateDto);

    return await this.findOne(findOption);
  }

  async deleteItem<Option>(delOption: Option): Promise<void> {
    await this.findOne(delOption);
    await this.repository.delete(delOption);
  }
}
