import {
  Attributes,
  CreationAttributes,
  FindOptions,
  UpdateOptions,
} from 'sequelize';
import { Model } from 'sequelize-typescript';
import { UpdateValues } from 'src/utils/sequelize.types.abstractions';

export interface IDatabaseService<T extends Model> {
  create(entity: CreationAttributes<T>): Promise<T>;
  findOne(options: FindOptions<Attributes<T>>): Promise<T> | null;
  update(
    props: UpdateValues<T>,
    options: UpdateOptions<Attributes<T>>,
  ): Promise<void>;
}
