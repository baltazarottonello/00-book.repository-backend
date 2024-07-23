import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Constants } from '../utils/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: typeof User, //TODO: BaseService for CRUD in DB so we apply DRY principle and make the Service more readable
  ) {}
  async create(entity: any): Promise<Boolean> {
    const hashedPassword = await bcrypt.hash(
      entity.password,
      Constants.SALT_OR_ROUNDS,
    );
    entity['password'] = hashedPassword;
    await this.usersRepository.create(entity);
    return true;
  }

  async find(entity: any): Promise<User> {
    const result = await this.usersRepository.findOne({
      where: {
        email: entity.email,
      },
    });
    return result;
  }
}
