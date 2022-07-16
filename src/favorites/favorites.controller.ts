import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiPath, ResCode } from 'src/common/constants/constants';
import { EntityID, FavsEntity } from 'src/common/types/entity-id';
import { FavoritesService } from './favorites.service';
import {
  Favorites,
  FavoritesEntity,
  FavoritesResponse,
} from './schemas/favorites.dto';

@Controller(ApiPath.favorites)
export class FavoritesController {
  constructor(private readonly service: FavoritesService) {}

  @Get()
  getFavs(): FavoritesResponse {
    return this.service.getFavs();
  }

  @Post(':entity/:id')
  @UsePipes(new ValidationPipe())
  addItem(@Param() { entity, id }: FavsEntity): void {
    this.service.addItem(FavoritesEntity[entity], id);
  }

  @Delete(':entity/:id')
  @HttpCode(ResCode.deletedSuccess)
  @UsePipes(new ValidationPipe())
  async deleteItem(@Param() { entity, id }: FavsEntity): Promise<void> {
    await this.service.deleteItem(FavoritesEntity[entity], id);
  }
}
