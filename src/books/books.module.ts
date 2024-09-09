import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { booksProvider } from './books.provider';

@Module({
  providers: [booksProvider, BooksService],
})
export class BooksModule {}
