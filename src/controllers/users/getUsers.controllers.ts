import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { IUser } from "../../utils/typings";

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const users: Array<IUser> | null = await User.find(
      {},
      "name username country"
    ).populate("blogs", "-author");
    if (users === null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByID = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { _id } = req.params;
    const user: IUser | null = await User.findById(
      { _id: _id },
      "name username country"
    ).populate("blogs", "-author");
    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

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
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
