import { Injectable } from '@nestjs/common';
import { CredentialsError } from 'src/errors/CredentialsError';
import { UsersService } from 'src/users/users.service';
import { findByEmailFilter } from 'src/utils/filters';
import { LoginCredentials } from 'src/types/credentials';
import { SecurityService } from 'src/security/security.service';
import { TokenService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private securityService: SecurityService,
    private tokensService: TokenService,
  ) {}

  async auth(credentials: LoginCredentials): Promise<{ accessToken: string }> {
    const { email, loginPassword } = credentials;
    const user = await this.usersService.findOne(findByEmailFilter(email));
    if (!user) {
      throw new CredentialsError(`User "${credentials.email}" not found`);
    }
    const { id, password } = user;
    const validate = await this.securityService.comparePassword({
      loginPassword,
      password,
    });

    if (!validate) {
      throw new CredentialsError('Incorrect password');
    }

    const acessToken = await this.tokensService.createAccessToken({
      sub: id,
    });

    return { accessToken: acessToken };
  }
}
