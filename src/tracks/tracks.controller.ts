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
import { ResCode } from 'src/common/constants/constants';
import { EntityID } from 'src/common/types/entity-id';
import { CreateTrackDto, Track, UpdateTrackDto } from './schemas/tracks.dto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private readonly service: TracksService) {}

  @Get()
  getUsers(): Track[] {
    return this.service.getTracks();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getUserById(@Param() { id }: EntityID): Track {
    return this.service.getTrackById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateTrackDto): Track {
    return this.service.addTrack(createUserDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateUserPassword(
    @Param() { id }: EntityID,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    return this.service.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(ResCode.deletedSuccess)
  @UsePipes(new ValidationPipe())
  async deleteUser(@Param() { id }: EntityID): Promise<void> {
    await this.service.deleteTrack(id);
  }
}
