import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiPath, ResCode } from 'src/shared/constants/constants';
import { EntityID } from 'src/shared/types/entity-id';
import { Album } from './album.entity';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto, UpdateAlbumDto } from './albums.dto';

@Controller(ApiPath.albums)
export class AlbumsController {
  constructor(private readonly service: AlbumsService) {}

  @Get()
  async getAlbums(): Promise<Album[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async getAlbumById(@Param() { id }: EntityID): Promise<Album> {
    return await this.service.findOne({ id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.service.addItem(createAlbumDto);
  }

  @Put(':id')
  async updateAlbumPassword(
    @Param() { id }: EntityID,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.service.updateItem({ id }, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(ResCode.deletedSuccess)
  async deleteAlbum(@Param() { id }: EntityID): Promise<void> {
    await this.service.deleteItem({ id });
  }
}
