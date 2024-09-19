import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { booksProvider } from './books.provider';
import { BooksControllers } from './books.controller';
import { TokenModule } from 'src/tokens/tokens.module';

@Module({
  imports: [TokenModule],
  providers: [booksProvider, BooksService],
  controllers: [BooksControllers],
  exports: [BooksService],
})
export class BooksModule {}
