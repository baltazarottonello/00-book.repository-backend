export namespace Constants {
  export const SALT_OR_ROUNDS = 10;
}

export namespace JwtConstants {
  export const secret = process.env.JWT_SECRET;
}
