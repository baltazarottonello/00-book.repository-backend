import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Constants } from '../utils/constants';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { Attributes, FindOptions, Optional } from 'sequelize';

@Injectable()
export class UsersService extends DatabaseService<User> {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: typeof User,
  ) {
    super(usersRepository);
  }
  async create(entity: Optional<any, string>): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      entity.password,
      Constants.SALT_OR_ROUNDS,
    );
    entity['password'] = hashedPassword;
    const result = await super.create(entity);
    return result;
  }

  async findOne(options: FindOptions<Attributes<User>>): Promise<User> {
    const result = await super.findOne(options);

    return result;
  }
}
