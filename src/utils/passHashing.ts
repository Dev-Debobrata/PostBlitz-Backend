import { genSalt, hash } from 'bcrypt';

export const passHash = async (password: string): Promise<string> => {
    const salt = await genSalt(10);
    const hashed = await hash(password, salt);
    return hashed.toString();
}
