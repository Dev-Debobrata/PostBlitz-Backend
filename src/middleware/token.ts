import * as dotenv from "dotenv";
import jwt, { JwtPayload, Secret, verify } from "jsonwebtoken";
import { IUser } from "../utils/typings";

dotenv.config({ path: __dirname + "/../.env" });

const USER_ACCESS_TOKEN_SECRET: Secret = `${process.env.USER_ACCESS_TOKEN_SECRET}`;
const ADMIN_ACCESS_TOKEN_SECRET: Secret = `${process.env.ADMIN_ACCESS_TOKEN_SECRET}`;
const USER_REFRESH_TOKEN_SECRET: Secret = `${process.env.USER_REFRESH_TOKEN_SECRET}`;

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

export const refreshAdminToken = async (user: IUser) => {
  const payload: JwtPayload = {
      userId: user.sessionId,
    },
    options = {
      expiresIn: "6h",
    };
  const token = await jwt.sign(payload, ADMIN_ACCESS_TOKEN_SECRET, options);

  return token;
};

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

export const verifyUserToken = async (token: any) => {
  const verified = await verify(
    token,
    USER_ACCESS_TOKEN_SECRET || USER_REFRESH_TOKEN_SECRET
  );

  return verified;
};
