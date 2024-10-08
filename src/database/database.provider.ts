import { Sequelize } from 'sequelize-typescript';
import { DatabaseConstants } from 'src/utils/constants';
import { dev } from './config/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(dev);
      sequelize.addModels(DatabaseConstants.DB_MODELS);
      await sequelize.sync({ force: true }); // DEVELOPMENT ONLY, USE MIGRATIONS FOR PRODUCTION
      return sequelize;
    },
  },
];
