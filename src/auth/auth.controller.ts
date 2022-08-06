import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiPath, ResCode } from 'src/shared/constants/constants';
import { CreateUserDto } from 'src/users/user.dto';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthRefreshDto, Tokens } from './auth.typings';

@Controller(ApiPath.auth)
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login')
  @HttpCode(ResCode.authorized)
  async login(@Body() authDto: AuthDto): Promise<Tokens> {
    return await this.service.login(authDto);
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(ResCode.createdSuccess)
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    await this.service.addUser(createUserDto);
    return `User: ${createUserDto.login} is registered`;
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('refresh')
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(ResCode.authorized)
  async refresh(@Body() refreshDto: AuthRefreshDto): Promise<Tokens> {
    return await this.service.refreshTokens(refreshDto);
  }
}
