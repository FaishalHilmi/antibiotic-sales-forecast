export const isValidUsername = (username: string): boolean => {
  const regex = /^[a-z0-9_]+$/;
  return username.length >= 3 && username.length <= 20 && regex.test(username);
};
