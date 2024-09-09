import { Books } from 'src/books/books.entity';
import { RefreshToken } from 'src/tokens/tokens.entity';
import { User } from 'src/users/users.entity';

export namespace DatabaseConstants {
  export const DB_MODELS = [User, RefreshToken, Books];
}

export namespace Constants {
  export const SALT_OR_ROUNDS = 10;
}

export namespace JwtConstants {
  export const JWT_SECRET = process.env.JWT_SECRET;
  export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
}
