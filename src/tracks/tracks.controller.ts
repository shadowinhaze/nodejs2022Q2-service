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
import { CreateTrackDto, Track, UpdateTrackDto } from './schemas/tracks.dto';
import { TracksService } from './tracks.service';

@Controller(ApiPath.tracks)
export class TracksController {
  constructor(private readonly service: TracksService) {}

  @Get()
  getTrack(): Track[] {
    return this.service.getTracks();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getTrackById(@Param() { id }: EntityID): Track {
    return this.service.getItemById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateTrackDto): Track {
    return this.service.addTrack(createUserDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateTrack(
    @Param() { id }: EntityID,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.service.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(ResCode.deletedSuccess)
  @UsePipes(new ValidationPipe())
  async deleteTrack(@Param() { id }: EntityID): Promise<void> {
    await this.service.deleteTrack(id);
  }
}
