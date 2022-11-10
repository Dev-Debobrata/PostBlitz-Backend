import { genSalt, hash, compare } from "bcrypt";

export const passHash = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  const hashed = await hash(password, salt);
  return hashed.toString();
};

export const IsValidUser = async (
  password: string,
  userPassword: string
): Promise<boolean> => {
  return await compare(password, userPassword);
};
