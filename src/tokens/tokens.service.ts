import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RefreshToken, TokenPayload } from './tokens.entity';
import { JwtService } from '@nestjs/jwt';
import { findRefreshTokenByUserIdAndStatus } from 'src/utils/filters';

@Injectable()
export class TokenService extends DatabaseService<RefreshToken> {
  constructor(
    @Inject('TOKENS_REPOSITORY') tokensRepository: typeof RefreshToken,
    private readonly jwtService: JwtService,
  ) {
    super(tokensRepository);
  }

  async createTokens(payload: TokenPayload) {
    payload['iat'] = Date.now();
    const token = await this.jwtService.signAsync(payload);
    await this.createRefreshToken(payload);

    return { token };
  }

  private async createRefreshToken(payload: any) {
    const refreshToken = this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '3600s',
    });

    return refreshToken;
  }

  async checkRefreshToken(userId: number): Promise<boolean> {
    const filter = findRefreshTokenByUserIdAndStatus(userId, true);

    const token = await super.findOne(filter);

    const valid = await this.jwtService.verifyAsync(token.refreshToken);

    if (!valid) {
      const props = {
        isActive: false,
      };
      await super.update(props, filter);
    }

    return valid ? true : false;
  }
}
