import {
  // Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  // Req,
  // Res,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import TokenGuard from 'src/guards/token.guard';

@Controller('/books')
export class BooksControllers {
  constructor(private readonly booksService: BooksService) {}

  @Get('/all') //findAllBooks
  async findAllBooks() {}

  @Get('/:isbn')
  async findOne() {}

  @Post('/check/:isbn')
  async checkBookData(
    @Param() params: { isbn: string },
    @Req() req: any,
    @Res() res: any,
  ): Promise<any> {
    try {
      const response = await this.booksService.getBookDataByIsbn(params.isbn);
      res.status(200).json(response);
    } catch (e) {
      res.status(500).json('Server Error');
    }
  }

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
