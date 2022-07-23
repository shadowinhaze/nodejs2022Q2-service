import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EntityID } from 'src/shared/types/entity-id';
import { ApiPath, ResCode } from '../shared/constants/constants';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller(ApiPath.users)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getUsers(): Promise<User[]> {
    return this.service.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUserById(@Param() { id }: EntityID): Promise<User> {
    return this.service.getUserById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.service.addUser(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updateUserPassword(
    @Param() { id }: EntityID,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return this.service.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(ResCode.deletedSuccess)
  async deleteUser(@Param() { id }: EntityID): Promise<void> {
    await this.service.deleteUser(id);
  }
}
