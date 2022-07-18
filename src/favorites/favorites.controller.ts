import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiPath, ResCode } from 'src/shared/constants/constants';
import { FavsEntity } from 'src/shared/types/entity-id';
import { Entity } from 'src/temp-db';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './schemas/favorites.dto';

@Controller(ApiPath.favorites)
export class FavoritesController {
  constructor(private readonly service: FavoritesService) {}

  @Get()
  getFavs(): FavoritesResponse {
    return this.service.getFavs();
  }

  @Post(':entity/:id')
  @HttpCode(ResCode.createdSuccess)
  addItem(@Param() { entity, id }: FavsEntity): {
    statusCode: number;
    message: string;
  } {
    this.service.addItem(Entity[`${entity}s`], id);
    return {
      statusCode: ResCode.createdSuccess,
      message: `${entity} with id: ${id} successfully added to favorites`,
    };
  }

  @Delete(':entity/:id')
  @HttpCode(ResCode.deletedSuccess)
  async deleteItem(@Param() { entity, id }: FavsEntity): Promise<void> {
    await this.service.deleteItem(Entity[`${entity}s`], id);
  }
}
