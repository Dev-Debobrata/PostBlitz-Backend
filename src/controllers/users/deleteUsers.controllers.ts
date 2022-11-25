import { Request, Response } from "express";
import { verifyUserToken } from "../../middleware/token";
import { User } from "../../models/user.model";
import { IUser } from "../../utils/typings";

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

    const { username } = req.body;

    const findUser: IUser | null = await User.findOne({ username: username });
    if (findUser === null) {
      res.status(404).json({ message: "user Not Found" });
    }

    if (findUser?.username !== getUser?.username) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await User.deleteOne({ username: username });
    res.status(201).json({ message: "User Deleted Successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
