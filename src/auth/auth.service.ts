import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResCode, UserResMsg } from 'src/shared/constants/constants';
import { CreateUserDto } from 'src/users/user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './auth.dto';
import { AuthRefreshDto, JwtPayload, Tokens } from './auth.typings';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async addUser(createUserDto: CreateUserDto) {
    await this.userService.addUser(createUserDto);
  }

  async login(authDto: AuthDto): Promise<Tokens> {
    const user = await this.validateUser(authDto);

    if (!user) {
      throw new HttpException(UserResMsg.unauthorized, ResCode.authFailed);
    }

    const tokens = await this.getTokens({ login: user.login, id: user.id });

    await this.userService.updateJRT(tokens.refreshToken, user.id);

    return tokens;
  }

  async refreshTokens({ refreshToken }: AuthRefreshDto): Promise<Tokens> {
    const userDataFromToken: JwtPayload = await this.jwtService.verifyAsync(
      refreshToken,
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        ignoreExpiration: false,
        maxAge: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );

    if (!userDataFromToken) {
      throw new HttpException(UserResMsg.invalidRT, ResCode.authFailed);
    }

    const user = await this.userService.getUserById(userDataFromToken.userId);

    const tokens = await this.getTokens({ login: user.login, id: user.id });

    await this.userService.updateJRT(tokens.refreshToken, user.id);

    return tokens;
  }

  private async validateUser({
    login,
    password,
  }: AuthDto): Promise<User | null> {
    const user: User = await this.userService.getUserByLogin(login);

    return user && user.password === password ? user : null;
  }

  private async getTokens({
    login,
    id,
  }: {
    login: string;
    id: string;
  }): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      userId: id,
      login: login,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
