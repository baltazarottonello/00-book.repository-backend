export const findByEmailFilter = (email: string) => {
  return {
    where: {
      email: email,
    },
  };
};
