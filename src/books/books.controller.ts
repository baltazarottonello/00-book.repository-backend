import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import TokenGuard from 'src/guards/token.guard';

@Controller('/books')
export class BooksControllers {
  constructor(private readonly booksService: BooksService) {}

  @Get('/all') //findAllBooks
  async findAllBooks() {}

  @Get('/:isbn')
  async findOne() {}

  @Post()
  async uploadBook() {}

  @UseGuards(TokenGuard)
  @Get() //findAllBooks for a specific User (get userId from TokenPayload)
  async findAllBooksByUser() {}

  @UseGuards(TokenGuard)
  @Get('/:userId/:isbn')
  async findOnePrivateBook() {}

  @UseGuards(TokenGuard)
  @Post('/:isbn')
  async deletePrivateBook() {}

  @UseGuards(TokenGuard)
  @Post('/:isbn')
  async updatePrivateBook() {}
}
