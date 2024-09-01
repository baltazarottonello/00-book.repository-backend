import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { tokensProvider } from './tokens.provider';
import { TokenService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from 'src/utils/constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JwtConstants.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    DatabaseModule,
  ],
  providers: [TokenService, ...tokensProvider],
  exports: [TokenService],
})
export class TokenModule {}
