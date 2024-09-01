export const findByEmailFilter = (email: string) => {
  return {
    where: {
      email: email,
    },
  };
};

export const findRefreshTokenByUserIdAndStatus = (
  userId: number,
  status: boolean,
) => {
  return { where: { userId: userId, isActive: status } };
};
