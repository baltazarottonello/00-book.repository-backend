import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.entity';

@Table({
  indexes: [
    {
      name: 'reftoken_userid_isactive',
      unique: true,
      fields: ['userId', 'isActive'],
      where: {
        isActive: true,
      },
    },
  ],
})
export class RefreshToken extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  userId: string;

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

  @BelongsTo(() => User, { onDelete: 'CASCADE' }) //WHEN A USER DELETED REFTOKEN/S ALSO DELETED
  user: User;
}

export class TokenPayload {
  sub: string;
  iat?: number;
}
