import * as dotenv from 'dotenv';
import jwt, { JwtPayload, verify } from 'jsonwebtoken';
import { IAdmin, ITokenPayload } from '../utils/types';

dotenv.config({ path: __dirname + '/../.env' });

const { ADMIN_ACCESS_TOKEN_SECRET } = process.env;

/**
 * @description - Generates user token
 */

/**
 * @description - Refreshes admin token
 */

export const refreshAdminToken = async (admin: IAdmin) => {
  const payload: JwtPayload = {
      adminId: admin._id
    },
    options = {
      expiresIn: '6h'
    };
  const token = await jwt.sign(
    payload,
    `${ADMIN_ACCESS_TOKEN_SECRET}`,
    options
  );

  return token;
};

/**
 * @description - Verifies admin token
 */

export const verifyAdminToken = async (token: string) => {
  const verified = await verify(token, `${ADMIN_ACCESS_TOKEN_SECRET}`);

  return verified as ITokenPayload;
};
