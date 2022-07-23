import { Repository, DeepPartial } from 'typeorm';

export class CollectionItem<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findOne<Option>(findOption: Option): Promise<T> {
    return await this.repository.findOneBy(findOption);
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
    const item = this.repository.findOneBy(findOption);

    await this.repository.update(findOption, updateDto);

    return await this.repository.findOneBy(findOption);
  }

  async deleteItem<Option>(findOption: Option): Promise<void> {
    await this.repository.delete(findOption);
  }
}
