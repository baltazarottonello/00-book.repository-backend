import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDTO, User } from './users.entity';
import { ValidationError } from 'sequelize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signUp(@Res() res: any, @Body() body: SignUpDTO): Promise<any> {
    try {
      const newUser: SignUpDTO = {
        name: body.name,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
      };
      await this.usersService.create(newUser);
      return res.status(200).json('User Created');
    } catch (e) {
      return e instanceof ValidationError
        ? res.status(409).json({ message: 'User already exists' })
        : res.status(500).json({ message: e.message });
    }
  }
}
