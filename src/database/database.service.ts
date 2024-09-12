import { Injectable } from '@nestjs/common';
import { Model, Repository } from 'sequelize-typescript';
import { IDatabaseService } from './idatabase.service';
import {
  Attributes,
  CreationAttributes,
  FindOptions,
  UpdateOptions,
} from 'sequelize';
import { UpdateValues } from 'src/utils/sequelize.types.abstractions';

@Injectable()
export class DatabaseService<T extends Model> implements IDatabaseService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async create(entity: CreationAttributes<T>): Promise<T> {
    const result = await this.genericRepository.create(entity);
    return result;
  }

  async findOne(options: FindOptions<Attributes<T>>): Promise<T> | null {
    const result = await this.genericRepository.findOne(options);
    return result;
  }

  async update(
    values: UpdateValues<T>,
    options?: UpdateOptions<Attributes<T>>,
  ): Promise<void> {
    await this.genericRepository.update(values, options);
  }
}
