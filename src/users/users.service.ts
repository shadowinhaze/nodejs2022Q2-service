import { HttpException, Injectable, Inject } from '@nestjs/common';
import { ResCode, UserResMsg } from '../shared/constants/constants';
import { CreateUserDto, UpdatePasswordDto } from './user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Encoder } from 'src/utils/cipharator';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly encoder: Encoder,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new HttpException(UserResMsg.notFound, ResCode.notFound);

    return user;
  }

  async getUserByLogin(login: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ login });

    if (user)
      return { ...user, password: await this.encoder.decrypt(user.password) };

    return null;
  }

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const password = await this.encoder.encrypt(createUserDto.password);

    const user = this.userRepository.create({
      ...createUserDto,
      password,
    });

    await this.userRepository.save(user);
    return user;
  }

  async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.getUserById(id);

    const currentPass = await this.encoder.decrypt(user.password);

    if (currentPass !== oldPassword)
      throw new HttpException(UserResMsg.oldPassWrong, ResCode.oldPassWrong);

    const password = await this.encoder.encrypt(newPassword);

    await this.userRepository.update(id, {
      password,
    });

    return await this.getUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.delete({ id });
  }

  async updateJRT(jrt: string, userId: string) {
    await this.userRepository.update(userId, {
      currentJRT: await this.encoder.encrypt(jrt),
    });
  }
}
