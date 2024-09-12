import { Inject, Injectable } from '@nestjs/common';
import { Books } from './books.entity';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BooksService extends DatabaseService<Books> {
  constructor(
    @Inject('BOOKS_REPOSITORY') private readonly booksRepository: typeof Books,
  ) {
    super(booksRepository);
  }

  // async create(entity: any): Promise<Books> {
  //   await super.create(entity);
  // }

  // async findAll() {}

  // async findOne(options: any): Promise<Books> {}

  // async update() {}

  // async delete() {}
}
