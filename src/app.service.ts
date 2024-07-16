import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(private sequelize: Sequelize) {}

  async getHello(): Promise<string> {
    await this.sequelize.authenticate();
    console.log('Database Connected');
    return 'Hello World!';
  }
}
