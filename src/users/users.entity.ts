import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  indexes: [{ fields: ['email'], unique: true, name: 'emailIndex' }],
})
export class User extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING(50),
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(50),
  })
  lastName: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(50),
  })
  email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(100),
  })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;
}
