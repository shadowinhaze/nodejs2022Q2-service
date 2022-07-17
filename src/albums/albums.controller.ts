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
import { AlbumsService } from './albums.service';
import { Album, CreateAlbumDto, UpdateAlbumDto } from './schemas/albums.dto';

@Controller(ApiPath.albums)
export class AlbumsController {
  constructor(private readonly service: AlbumsService) {}

  @Get()
  getAlbums(): Album[] {
    return this.service.getAlbums();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getAlbumById(@Param() { id }: EntityID): Album {
    return this.service.getItemById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.service.addAlbum(createAlbumDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateAlbumPassword(
    @Param() { id }: EntityID,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Album {
    return this.service.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(ResCode.deletedSuccess)
  @UsePipes(new ValidationPipe())
  async deleteAlbum(@Param() { id }: EntityID): Promise<void> {
    await this.service.deleteAlbum(id);
  }
}
