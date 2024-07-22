import { Injectable } from '@nestjs/common';
import { Model, Repository } from 'sequelize-typescript';
import { IDatabaseService } from './idatabase.service';

@Injectable()
export class DatabaseService<T extends Model> implements IDatabaseService<T> {
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
