import { Request, Response } from "express";
import { IsValidUser } from "../../middleware/passHashing";
import { verifyUserToken } from "../../middleware/token";
import { User } from "../../models/user.model";
import { serverError } from "../../utils/errorHandler";
import { IUser } from "../../utils/typings";

/**
 * @description This service is used to delete a user. It will check if the user is logged in or not. If the user is logged in then it will check verify the user's authentication using their password. If the user is authentic then it will delete the blog.
 */

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const sessionToken = req.cookies.sessionId;
    if (!sessionToken) {
      return res.status(302).json({ message: "Please Log In" });
    }

    const verifiedToken: any | undefined = await verifyUserToken(sessionToken);

    const getUser: IUser | null = await User.findOne({
      sessionId: verifiedToken?.userId,
    });
    if (getUser === null) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const { username, password } = req.body;

    const findUser: IUser | null = await User.findOne({ username: username });
    if (findUser === null) {
      res.status(404).json({ message: "user Not Found" });
    }

    if (findUser?.username !== getUser?.username) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const userPassword = findUser.password.toString();

    const result = await IsValidUser(password, userPassword);
    if (result === false) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    await User.deleteOne({ username: username });
    res.status(201).json({ message: "User Deleted Successfully" });
  } catch (error: any) {
    serverError(error, res);
  }
};
