import { IsString } from 'class-validator';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  indexes: [
    {
      name: 'books_id_isbn_access',
      unique: true,
      fields: ['id', 'isbn', 'access'],
    },
  ],
})
export class Books extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  title: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  //@ForeignKey(() => Authors)
  authorId: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  isbn: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  edition: number;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  year: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  publisher: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(10),
  })
  access: string;
  //   @HasMany(() => Authors, { onDelete: 'NO ACTION' })
  //   authors: Authors[];
}

export class UploadBookDTO {
  @IsString() //TODO : make a Regex for ISBN
  isbn: string;
}
