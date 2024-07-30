import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Constants } from '../utils/constants';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService extends DatabaseService<User> {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly usersRepository: typeof User, //TODO: BaseService for CRUD in DB so we apply DRY principle and make the Service more readable
  ) {
    super(usersRepository);
  }
  async create(entity: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      entity.password,
      Constants.SALT_OR_ROUNDS,
    );
    entity['password'] = hashedPassword;
    const result = await super.create(entity);
    return result;
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
