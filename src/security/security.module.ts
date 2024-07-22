import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { TokenModule } from 'src/tokens/tokens.module';

@Module({
  imports: [TokenModule],
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {}
