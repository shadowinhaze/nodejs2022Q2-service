import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiPath, Entity, ResCode } from 'src/shared/constants/constants';
import { FavsEntity } from 'src/shared/types/entity-id';
import { FavoritesService } from './favorites.service';
import { Favorites } from './favorites.entity';

@Controller(ApiPath.favorites)
export class FavoritesController {
  constructor(private readonly service: FavoritesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getFavs(): Promise<Favorites> {
    return await this.service.getFavs();
  }

  @Post(':entity/:id')
  @HttpCode(ResCode.createdSuccess)
  async addItem(@Param() { entity, id }: FavsEntity): Promise<{
    statusCode: number;
    message: string;
  }> {
    await this.service.addItem(Entity[`${entity}s`], id);
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
