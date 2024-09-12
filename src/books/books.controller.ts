import {
  // Body,
  Controller,
  Get,
  Post,
  // Req,
  // Res,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import TokenGuard from 'src/guards/token.guard';
//import { UploadBookDTO } from '../books/books.entity';

@Controller('/books')
export class BooksControllers {
  constructor(private readonly booksService: BooksService) {}

  @Get('/all') //findAllBooks
  async findAllBooks() {}

  @Get('/:isbn')
  async findOne() {}

  // @Post()
  // async uploadBook(
  //   @Body() dto: UploadBookDTO,
  //   @Req() req: any,
  //   @Res() res: any,
  // ) {}

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
