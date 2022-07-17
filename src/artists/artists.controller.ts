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
import {
  Artist,
  CreateArtistDto,
  UpdateArtistDto,
} from './schemas/artists.dto';

@Controller(ApiPath.artists)
export class ArtistsController {
  constructor(private readonly service: ArtistsService) {}

  @Get()
  getArtists(): Artist[] {
    return this.service.getArtists();
  }

  @Get(':id')
  getArtistById(@Param() { id }: EntityID): Artist {
    return this.service.getItemById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createArtist(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.service.addArtist(createArtistDto);
  }

  @Put(':id')
  updateArtist(
    @Param() { id }: EntityID,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    return this.service.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(ResCode.deletedSuccess)
  async deleteArtist(@Param() { id }: EntityID): Promise<void> {
    await this.service.deleteArtist(id);
  }
}
