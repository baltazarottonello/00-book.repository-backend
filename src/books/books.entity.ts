import { Model } from 'sequelize';
import { Table } from 'sequelize-typescript';

@Table({ freezeTableName: true })
export class Books extends Model {}
