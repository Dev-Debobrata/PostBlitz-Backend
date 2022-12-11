import { Request, Response } from "express";
import { verifyUserToken } from "../../middleware/token";
import { User } from "../../models/user.model";
import { IUser } from "../../utils/typings";
import { redisClient } from "../../utils/redisConfig";
import { serverError } from "../../utils/errorHandler";

/**
 * @description This service is used to get a user by ID. It will check if the user is logged in or not. If the user is logged in then it will get the user by ID.
 */

export const getUserByID = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const sessionToken = req.cookies.sessionId;
    if (!sessionToken) {
      return res.status(302).json({ message: "Please Log In" });
    }

    const verifiedToken: any | undefined = await verifyUserToken(sessionToken);

    const getUser: IUser | null = await User.findOne(
      {
        sessionId: verifiedToken?.userId,
      },
      "name username country email pincode address"
    ).populate("blogs", "-author");
    if (getUser === null) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(getUser);
  } catch (error: any) {
    serverError(error, res);
  }
};

/**
 * @description This service is used to get a user by username. It will check if the user is logged in or not. If the user is logged in then it will get the user by username.
 */

export const getUserByUsername = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { username } = req.params;

    const user: IUser | null = await User.findOne(
      { username: username },
      "name username country"
    ).populate("blogs", "-author");
    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    await redisClient.setEx(username, 3600, JSON.stringify(user));

    res.status(200).json(user);
  } catch (error: any) {
    serverError(error, res);
  }

};
