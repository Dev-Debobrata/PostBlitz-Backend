import { Request, Response } from "express";
import { verifyUserToken } from "../../middleware/token";
import { Blog } from "../../models/blog.model";
import { User } from "../../models/user.model";
import { IBlog, IUser } from "../../utils/typings";

export const patchBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const sessionToken = req.cookies.sessionId;
    if (!sessionToken) {
      return res.status(302).json({ message: "Please Log In" });
    }

    const verifiedToken: any | undefined = await verifyUserToken(sessionToken);

    const { title, description, content, categories } = req.body;

    const getAuthor: IUser | null = await User.findOne({
      sessionId: verifiedToken?.userId,
    });
    if (getAuthor === null) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const updateBlog: IBlog | null = await Blog.findOneAndUpdate(
      {
        _id: req.params._id,
      },
      {
        title,
        description,
        content,
        categories,
        updated_At: Date.now(),
      }
    );

    res.status(201).json({ message: "Blog Updated Successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
