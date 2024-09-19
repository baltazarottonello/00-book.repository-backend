import { Inject, Injectable } from '@nestjs/common';
import { BookData, Books } from './books.entity';
import { DatabaseService } from 'src/database/database.service';
import { PartialEntity } from 'src/utils/sequelize.types.abstractions';
import { ExternalBooksApiConstants } from 'src/utils/constants';

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
    const publish_date = jsonBookData.publish_date;
    const author = authorJson.name;
    return { title, publisher, publish_date, author };
  }

  // async findAll() {}

  // async findOne(options: any): Promise<Books> {}

  // async update() {}

  // async delete() {}
}
