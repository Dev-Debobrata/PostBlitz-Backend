import { genSalt, hash, compare } from "bcrypt";

/**
 * @description - Hashes the password
 * @param password - password to be hashed
 * @returns hashed password
 */

export const passHash = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  const hashed = await hash(password, salt);
  return hashed.toString();
};

/**
 * @description - Checks the password
 * @param password - password to be checked
 * @param userPassword - hashed password
 */

export const IsValidUser = async (
  password: string,
  userPassword: string
): Promise<boolean> => {
  return await compare(password, userPassword);
};
