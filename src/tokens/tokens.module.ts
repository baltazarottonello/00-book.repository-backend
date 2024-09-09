import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TokenService } from './tokens.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from 'src/utils/constants';
import { tokensProvider } from './tokens.provider';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JwtConstants.JWT_SECRET,
      signOptions: { expiresIn: '300s' },
    }),
    DatabaseModule,
  ],
  providers: [TokenService, tokensProvider],
  exports: [TokenService],
})
export class TokenModule {}
