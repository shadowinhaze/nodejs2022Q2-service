import { HttpException, Injectable } from '@nestjs/common';
import { ResCode, ResMsg } from './schemas/constants';
import {
  CreateUserDto,
  OuterUser,
  UpdatePasswordDto,
  User,
} from './schemas/user.dto';
import { USERS } from './temp-db/user-temp-db';

@Injectable()
export class UsersService {
  private userDB = USERS;

  getUsers(): OuterUser[] {
    return this.userDB.map((user) => {
      const { password, ...hiddenUser } = user;
      return hiddenUser;
    });
  }

  getUserById(id: string): OuterUser | undefined {
    const user = this.getUserFromDB(id);

    return this.getUserWithOutPass(user);
  }

  addUser({ login, password: pass }: CreateUserDto): OuterUser {
    const newUser = new User(login, pass);
    this.userDB.push(newUser);

    const { password, ...hiddenUser } = newUser;

    return hiddenUser;
  }

  updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): OuterUser {
    const user = this.getUserFromDB(id);

    if (user.password !== oldPassword)
      throw new HttpException(ResMsg.oldPassWrong, ResCode.oldPassWrong);

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return this.getUserWithOutPass(user);
  }

  async deleteUser(id: string): Promise<void> {
    this.getUserFromDB(id);

    this.userDB = this.userDB.filter((user) => user.id !== id);
  }

  private getUserFromDB(id: string): User {
    const user = this.userDB.find((user) => user.id === id);
    if (!user) throw new HttpException(ResMsg.notFound, ResCode.notFound);

    return user;
  }

  private getUserWithOutPass({ password, ...hiddenUser }: User) {
    return hiddenUser;
  }
}
