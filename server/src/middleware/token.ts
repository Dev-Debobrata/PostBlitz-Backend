import * as dotenv from 'dotenv';
import jwt, { JwtPayload, verify } from 'jsonwebtoken';
import { IAdmin, IUser, ITokenPayload } from '../utils/typings';

dotenv.config({ path: __dirname + '/../.env' });

const {
  USER_ACCESS_TOKEN_SECRET,
  ADMIN_ACCESS_TOKEN_SECRET,
  USER_REFRESH_TOKEN_SECRET
} = process.env;

/**
 * @description - Generates user token
 */

export const generateUserToken = async (user: IUser) => {
  const payload: JwtPayload = {
      userId: user.sessionId
    },
    options = {
      expiresIn: '30d'
    };
  const token = await jwt.sign(payload, `${USER_ACCESS_TOKEN_SECRET}`, options);

  return token;
};

/**
 * @description - Generates refresh token
 */

export const RefreshUserToken = async (user: IUser) => {
  const payload: JwtPayload = {
      userId: user.sessionId
    },
    options = {
      expiresIn: '30d'
    };
  const token = await jwt.sign(
    payload,
    `${USER_REFRESH_TOKEN_SECRET}`,
    options
  );

  return token;
};

/**
 * @description - Verifies user token
 */

export const verifyUserToken = async (
  token: string
): Promise<ITokenPayload> => {
  const verified = await verify(
    token,
    `${USER_ACCESS_TOKEN_SECRET}` || `${USER_REFRESH_TOKEN_SECRET}`
  );

  return verified as ITokenPayload;
};

/**
 * @description - Refreshes admin token
 */

export const refreshAdminToken = async (admin: IAdmin) => {
  const payload: JwtPayload = {
      adminId: admin.sessionId
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

  return verified;
};
