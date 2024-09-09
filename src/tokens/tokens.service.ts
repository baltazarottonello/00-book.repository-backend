import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { RefreshToken, TokenPayload } from './tokens.entity';
import { JwtService } from '@nestjs/jwt';
import { findRefreshTokenByUserIdAndStatus } from 'src/utils/filters';
import { JwtConstants } from '../utils/constants';

@Injectable()
export class TokenService extends DatabaseService<RefreshToken> {
  constructor(
    @Inject('TOKENS_REPOSITORY') tokensRepository: typeof RefreshToken,
    private readonly jwtService: JwtService,
  ) {
    super(tokensRepository);
  }

  async createAccessToken(payload: TokenPayload): Promise<string> {
    payload.iat = Date.now();
    const token = await this.jwtService.signAsync(payload);
    const RefreshTokenActive = await this.checkRefreshToken(payload.sub);

    if (!RefreshTokenActive) {
      await this.createRefreshToken(payload);
      return token;
    }

    return token;
  }

  private async createRefreshToken(payload: TokenPayload): Promise<void> {
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: JwtConstants.JWT_REFRESH_SECRET,
      expiresIn: '3600s',
    });
    const entity = {
      userId: payload.sub,
      isActive: true,
      refreshToken: refreshToken,
    } as RefreshToken;
    await super.create(entity);
    return;
  }

  async checkRefreshToken(userId: string): Promise<boolean> {
    const filter = findRefreshTokenByUserIdAndStatus(userId, true);

    const refToken = await super.findOne(filter);

    if (!refToken) {
      return false;
    }

    const valid = await this.jwtService.verifyAsync(refToken.refreshToken, {
      secret: JwtConstants.JWT_REFRESH_SECRET,
    });

    if (!valid) {
      const props = {
        isActive: false,
      };
      await super.update(props, filter);
    }

    return valid ? true : false;
  }

  async checkAccessToken(token: string): Promise<TokenPayload> {
    const data: TokenPayload = await this.jwtService.verifyAsync(token, {
      secret: JwtConstants.JWT_SECRET,
    });

    return data;
  }

  async decodeToken(token: string): Promise<TokenPayload> {
    const payload: TokenPayload = await this.jwtService.decode(token, {
      complete: true,
      json: true,
    });

    return payload;
  }
}
