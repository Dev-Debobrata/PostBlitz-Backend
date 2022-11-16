import { Request, Response } from "express";
import { User } from "../../models/user.model";
import { IUser } from "../../utils/typings";

export const patchUserLikes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { _id } = req.params;
    const { likedBlogs } = req.body;

    const user: IUser | null = await User.findOne({ _id: _id });
    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }
    const likeUpdated = await User.updateMany(
      {
        likedBlogs: likedBlogs,
        updated_At: Date.now(),
      },
      (err: any) => {
        if (!err) {
          return res.status(400).json({ message: "Like Added successfully" });
        }
      }
    );
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; // Work On progress
