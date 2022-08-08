import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './users.providers';
import { Encoder } from 'src/utils/cipharator';

@Module({
  imports: [DatabaseModule],
  providers: [...usersProviders, UsersService, Encoder],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
