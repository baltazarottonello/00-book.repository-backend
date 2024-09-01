import { Sequelize } from 'sequelize-typescript';
import { DatabaseConstants } from 'src/utils/constants';
import { dev } from './config/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(dev);
      sequelize.addModels(DatabaseConstants.DB_MODELS);
      await sequelize.sync({ alter: true }); //CHANGE?
      return sequelize;
    },
  },
];
