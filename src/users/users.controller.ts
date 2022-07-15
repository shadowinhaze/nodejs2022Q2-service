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
import { ResCode } from './schemas/constants';
import {
  CreateUserDto,
  FindUserById,
  OuterUser,
  UpdatePasswordDto,
} from './schemas/user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  getUsers(): OuterUser[] {
    return this.service.getUsers();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getUserById(@Param() { id }: FindUserById): OuterUser {
    return this.service.getUserById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createUserDto: CreateUserDto): OuterUser {
    return this.service.addUser(createUserDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateUserPassword(
    @Param() { id }: FindUserById,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): OuterUser {
    return this.service.updateUserPassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(ResCode.deletedSuccess)
  @UsePipes(new ValidationPipe())
  async deleteUser(@Param() { id }: FindUserById): Promise<void> {
    await this.service.deleteUser(id);
  }
}
