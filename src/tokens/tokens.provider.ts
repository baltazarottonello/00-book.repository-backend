import { RefreshToken } from './tokens.entity';

export const tokensProvider = [
  {
    provide: 'TOKENS_REPOSITORY',
    useValue: RefreshToken,
  },
];
