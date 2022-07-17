import { HttpException, Injectable } from '@nestjs/common';
import { UsersDB } from 'src/temp-db';
import { ResCode, UserResMsg } from '../shared/constants/constants';
import {
  CreateUserDto,
  OuterUser,
  UpdatePasswordDto,
  User,
} from './schemas/user.dto';

@Injectable()
export class UsersService {
  private userDB = UsersDB;

  getUsers(): OuterUser[] {
    return this.userDB;
  }

  getUserById(id: string): OuterUser {
    return this.getUserFromDB(id);
  }

  addUser({ login, password: pass }: CreateUserDto): OuterUser {
    const newUser = new User(login, pass);
    this.userDB.push(newUser);

    return newUser;
  }

  updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): OuterUser {
    const user = this.getUserFromDB(id);

    if (user.password !== oldPassword)
      throw new HttpException(UserResMsg.oldPassWrong, ResCode.oldPassWrong);

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    this.getUserFromDB(id);

    this.userDB = this.userDB.filter((user) => user.id !== id);
  }

  private getUserFromDB(id: string): User {
    const user = this.userDB.find((user) => user.id === id);
    if (!user) throw new HttpException(UserResMsg.notFound, ResCode.notFound);

    return user;
  }
}
