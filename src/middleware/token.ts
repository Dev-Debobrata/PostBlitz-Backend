import * as dotenv from "dotenv";
import jwt, { JwtPayload, Secret, verify } from "jsonwebtoken";
import { IAdmin, IUser } from "../utils/typings";

dotenv.config({ path: __dirname + "/../.env" });

const USER_ACCESS_TOKEN_SECRET: Secret = `${process.env.USER_ACCESS_TOKEN_SECRET}`;
const ADMIN_ACCESS_TOKEN_SECRET: Secret = `${process.env.ADMIN_ACCESS_TOKEN_SECRET}`;
const USER_REFRESH_TOKEN_SECRET: Secret = `${process.env.USER_REFRESH_TOKEN_SECRET}`;

/**
 * @description - Generates user token
 */

export const generateUserToken = async (user: IUser) => {
  const payload: JwtPayload = {
      userId: user.sessionId,
    },
    options = {
      expiresIn: "30d",
    };
  const token = await jwt.sign(payload, USER_ACCESS_TOKEN_SECRET, options);

  return token;
};

/**
 * @description - Generates refresh token
 */

export const RefreshUserToken = async (user: IUser) => {
  const payload: JwtPayload = {
      userId: user.sessionId,
    },
    options = {
      expiresIn: "30d",
    };
  const token = await jwt.sign(payload, USER_REFRESH_TOKEN_SECRET, options);

  return token;
};

/**
 * @description - Verifies user token
 */

export const verifyUserToken = async (token: any) => {
  const verified = await verify(
    token,
    USER_ACCESS_TOKEN_SECRET || USER_REFRESH_TOKEN_SECRET
  );

  return verified;
};

/**
 * @description - Refreshes admin token
 */

export const refreshAdminToken = async (admin: IAdmin) => {
  const payload: JwtPayload = {
      adminId: admin.sessionId,
    },
    options = {
      expiresIn: "6h",
    };
  const token = await jwt.sign(payload, ADMIN_ACCESS_TOKEN_SECRET, options);

  return token;
};

/**
 * @description - Verifies admin token
 */

export const verifyAdminToken = async (token: any) => {
  const verified = await verify(
    token,
    ADMIN_ACCESS_TOKEN_SECRET
  );

  return verified;
};