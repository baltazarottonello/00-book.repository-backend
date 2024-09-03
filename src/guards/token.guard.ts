import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from 'src/tokens/tokens.service';

@Injectable()
export default class TokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    try {
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      await this.tokenService.checkAccessToken(token);
      return true;
    } catch (e) {
      if (!(e instanceof UnauthorizedException)) {
        const payload = await this.tokenService.decodeToken(token);

        const valid = await this.tokenService.checkRefreshToken(payload.sub);

        if (!valid) {
          throw new UnauthorizedException();
        }

        const newToken = await this.tokenService.createTokens(payload);

        req['Authorization'] = `Bearer ${newToken}`;

        return true;
      }

      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
