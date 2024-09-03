import { Module } from '@nestjs/common';

import { TokenModule } from 'src/tokens/tokens.module';
import TokenGuard from './token.guard';

@Module({
  imports: [TokenModule],
  providers: [],
  exports: [TokenGuard],
})
export class GuardsModule {}
