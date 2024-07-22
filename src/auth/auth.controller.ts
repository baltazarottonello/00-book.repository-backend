import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from 'src/users/users.entity';
import { CredentialsError } from 'src/errors/CredentialsError';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Res() res: any, @Body() body: UserLoginDTO) {
    //TODO Add ValidationPipes
    try {
      const { email, loginPassword } = body;
      const credentials = {
        email,
        loginPassword,
      };
      const response = await this.authService.auth(credentials);
      res.status(200).json(response);
    } catch (e) {
      e instanceof CredentialsError
        ? res.status(401).json(e.message) //TODO : create enum HttpStatus with HTTP Status codes
        : res.status(500).json(e.message);
    }
  }
}
