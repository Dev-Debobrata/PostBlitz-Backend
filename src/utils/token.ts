import * as dotenv from "dotenv";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { IUser } from "./typings";

dotenv.config({ path: __dirname + "/../.env" });

const ACCESS_TOKEN_SECRET: Secret = `${process.env.ACCESS_TOKEN_SECRET}`;

export const generateToken = async (user: IUser) => {
  const payload: JwtPayload = {
      username: user.username,
    },
    options = {
      expiresIn: "1d",
    };
  const token = await jwt.sign(payload, ACCESS_TOKEN_SECRET, options);

  return token;
};
