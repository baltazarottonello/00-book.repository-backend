import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.entity';

@Table({
  indexes: [
    { name: 'userid_reftoken', type: 'UNIQUE', fields: ['userId', 'isActive'] },
  ],
})
export class RefreshToken extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  @ForeignKey(() => User)
  userId: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  refreshToken: string;

  @Column({
    allowNull: false,
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;
}

export class TokenPayload {
  sub: number;
  iat?: number;
}
