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
import {
  CreateUserDto,
  OuterUser,
  UpdatePasswordDto,
} from './schemas/user.dto';
import { UsersService } from './users.service';

@Controller(ApiPath.users)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers(): OuterUser[] {
    return this.service.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @UsePipes(new ValidationPipe())
  getUserById(@Param() { id }: EntityID): OuterUser {
    return this.service.getUserById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateUserDto): OuterUser {
    return this.service.addUser(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateUserPassword(
    @Param() { id }: EntityID,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): OuterUser {
    return this.service.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(ResCode.deletedSuccess)
  @UsePipes(new ValidationPipe())
  async deleteUser(@Param() { id }: EntityID): Promise<void> {
    await this.service.deleteUser(id);
  }
}
