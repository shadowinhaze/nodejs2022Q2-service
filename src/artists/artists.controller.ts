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
import { ArtistsService } from './artists.service';
import { CreateArtistDto, UpdateArtistDto } from './artists.dto';
import { Artist } from './artist.entity';

@Controller(ApiPath.artists)
export class ArtistsController {
  constructor(private readonly service: ArtistsService) {}

  @Get()
  async getArtist(): Promise<Artist[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async getArtistById(@Param() { id }: EntityID): Promise<Artist> {
    return await this.service.findOne({ id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<Artist> {
    return await this.service.addItem(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param() { id }: EntityID,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.service.updateItem({ id }, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(ResCode.deletedSuccess)
  async deleteArtist(@Param() { id }: EntityID): Promise<void> {
    await this.service.deleteItem({ id });
  }
}
