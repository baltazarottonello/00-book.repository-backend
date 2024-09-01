import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDTO, User } from './users.entity';
import { ValidationError } from 'sequelize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //TO DELETE
  @Get()
  async ping(@Res() res: any) {
    res.status(200).json('pong');
  }

  @Post('/signup')
  async signUp(@Res() res: any, @Body() body: SignUpDTO): Promise<any> {
    try {
      const { name, lastName, email, password } = body;
      const user = {
        name,
        lastName,
        email,
        password,
      } as User;
      console.log(user);
      await this.usersService.create(user);
      return res.status(200).json('User created');
    } catch (e) {
      return e instanceof ValidationError
        ? res.status(409).json('User already exists')
        : res.status(500).json({ message: e.message });
    }
  }
}
