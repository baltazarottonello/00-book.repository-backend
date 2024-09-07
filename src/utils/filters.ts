export const findByEmailFilter = (email: string) => {
  return {
    where: {
      email: email,
    },
  };
};

export const findRefreshTokenByUserIdAndStatus = (
  userId: string,
  status: boolean,
) => {
  return { where: { userId: userId, isActive: status } };
};
