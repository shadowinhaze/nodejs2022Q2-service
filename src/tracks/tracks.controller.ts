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
import { CreateTrackDto, UpdateTrackDto } from './tracks.dto';
import { Track } from './track.entity';
import { TracksService } from './tracks.service';

@Controller(ApiPath.tracks)
export class TracksController {
  constructor(private readonly service: TracksService) {}

  @Get()
  async getTrack(): Promise<Track[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async getTrackById(@Param() { id }: EntityID): Promise<Track> {
    return await this.service.findOne({ id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.service.addItem(createTrackDto);
  }

  @Put(':id')
  async updateTrack(
    @Param() { id }: EntityID,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<Track> {
    return await this.service.updateItem({ id }, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(ResCode.deletedSuccess)
  async deleteTrack(@Param() { id }: EntityID): Promise<void> {
    await this.service.deleteItem({ id });
  }
}
