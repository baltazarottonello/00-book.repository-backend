import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { dev } from './database/config/config';

@Module({
  imports: [SequelizeModule.forRoot(dev)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
