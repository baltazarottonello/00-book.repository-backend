import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { SecurityService } from './security/security.service';
import { SecurityModule } from './security/security.module';
import { TokenModule } from './tokens/tokens.module';

@Module({
  imports: [
    TokenModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    SecurityModule,
  ],
  providers: [SecurityService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(validator).forRoutes(AuthController);
  // }
}
