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
import { ApiPath, ResCode } from 'src/common/constants/constants';
import { EntityID } from 'src/common/types/entity-id';
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
  getUsers(): Artist[] {
    return this.service.getArtists();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getUserById(@Param() { id }: EntityID): Artist {
    return this.service.getArtistById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.service.addArtist(createArtistDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateUserPassword(
    @Param() { id }: EntityID,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    return this.service.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(ResCode.deletedSuccess)
  @UsePipes(new ValidationPipe())
  async deleteUser(@Param() { id }: EntityID): Promise<void> {
    await this.service.deleteArtist(id);
  }
}
