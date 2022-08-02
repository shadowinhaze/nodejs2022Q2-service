import { HttpException, Injectable, Inject } from '@nestjs/common';
import { ResCode, UserResMsg } from '../shared/constants/constants';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new HttpException(UserResMsg.notFound, ResCode.notFound);

    return user;
  }

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.getUserById(id);

    if (user.password !== oldPassword)
      throw new HttpException(UserResMsg.oldPassWrong, ResCode.oldPassWrong);

    await this.userRepository.update(id, {
      password: newPassword,
    });

    return await this.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.delete({ id });
  }
}
