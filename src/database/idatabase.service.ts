import { Model } from 'sequelize-typescript';

export interface IDatabaseService<T extends Model> {
  create(entity: T): Promise<T>;
  findOne(options: any): Promise<T> | null;
}
