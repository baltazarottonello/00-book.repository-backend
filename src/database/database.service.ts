import { Injectable } from '@nestjs/common';
import { Model, Repository } from 'sequelize-typescript';
import { filters } from 'src/utils/filters';

@Injectable()
export class DatabaseService<T extends Model> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async create(entity: any): Promise<T> {
    const result = await this.genericRepository.create(entity);
    return result;
  }

  async findOne(options: any): Promise<T> | null {
    const result = await this.genericRepository.findOne(options);
    return result;
  }
}
