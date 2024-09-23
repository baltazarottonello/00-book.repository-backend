import { Inject, Injectable } from '@nestjs/common';
import { BookData, Books } from './books.entity';
import { DatabaseService } from 'src/database/database.service';
import { PartialEntity } from 'src/utils/sequelize.types.abstractions';
import { ExternalBooksApiConstants } from 'src/utils/constants';
import {
  Attributes,
  DestroyOptions,
  FindOptions,
  UpdateOptions,
} from 'sequelize';

@Injectable()
export class BooksService extends DatabaseService<Books> {
  constructor(
    @Inject('BOOKS_REPOSITORY') private readonly booksRepository: typeof Books,
  ) {
    super(booksRepository);
  }

  async create(entity: PartialEntity): Promise<Books> {
    const result = await super.create(entity);
    return result;
  }

  async findOne(options: FindOptions<Attributes<Books>>): Promise<Books> {
    const result = await super.findOne(options);
    return result;
  }

  async findAll(entity: FindOptions<Attributes<Books>>): Promise<Books[]> {
    const response = await super.findAll(entity);
    return response;
  }

  async update(values: PartialEntity, options: UpdateOptions): Promise<void> {
    await super.update(values, options);
  }

  async delete(options: DestroyOptions<Attributes<Books>>): Promise<void> {
    await super.delete(options);
  }

  async getBookDataByIsbn(isbn: string): Promise<BookData> {
    const rawBookData = await fetch(
      `${ExternalBooksApiConstants.BASE_URL}/isbn/${isbn}.json`,
    );
    const jsonBookData = await rawBookData.json();
    const rawAuthorData = await fetch(
      `${ExternalBooksApiConstants.BASE_URL}${jsonBookData.authors[0].key}.json`,
    );
    const authorJson = await rawAuthorData.json();
    const title = jsonBookData.title;
    const publisher = jsonBookData.publishers[0];
    const edition_year = jsonBookData.publish_date;
    const author = authorJson.name;

    return { title, publisher, edition_year, author };
  }
}
