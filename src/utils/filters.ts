export namespace filters {
  export const findByEmail = (email: string) => {
    return {
      where: {
        email: email,
      },
    };
  };
}
