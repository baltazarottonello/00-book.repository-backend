import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders], //spread operator ... (expands an existing array "usersProviders")
  exports: [UsersService],
})
export class UsersModule {}
