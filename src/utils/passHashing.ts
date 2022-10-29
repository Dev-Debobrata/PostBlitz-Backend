import { compare, genSalt, hash } from 'bcrypt';

export const passHash = async (password: string): Promise<any> => {
    const salt = await genSalt(10);
    const hashed = await hash(password, salt);
    return hashed;
}
