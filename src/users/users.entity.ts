import { IsEmail, IsString } from 'class-validator';
import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  IsUUID,
} from 'sequelize-typescript';
import { Books } from 'src/books/books.entity';
import { RefreshToken } from 'src/tokens/tokens.entity';

@Table({
  indexes: [{ name: 'user_email', unique: true, fields: ['email'] }],
})
export class User extends Model {
  @IsUUID(4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

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

  @HasMany(() => RefreshToken)
  refreshTokens: RefreshToken[];

  @HasMany(() => Books)
  books: Books[];
}

export class SignUpDTO {
  @IsString()
  name: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class UserLoginDTO {
  @IsEmail()
  email: string;
  @IsString()
  loginPassword: string;
}
