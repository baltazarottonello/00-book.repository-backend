import { Books } from './books.entity';

export const booksProvider = {
  provide: 'BOOKS_REPOSITORY',
  useValue: Books,
};
