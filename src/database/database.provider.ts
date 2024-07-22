import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/users.entity';
import { dev } from './config/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(dev);
      sequelize.addModels([User]);
      await sequelize.sync({ alter: true }); //CHANGE?
      return sequelize;
    },
  },
];
