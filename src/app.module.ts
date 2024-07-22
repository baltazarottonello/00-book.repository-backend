import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [AppService],
})
export class AppModule {}
