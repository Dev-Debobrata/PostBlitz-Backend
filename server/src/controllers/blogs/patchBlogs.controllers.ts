import { Request, Response } from "express";
import { verifyUserToken } from "../../middleware/token";
import { Blog } from "../../models/blog.model";
import { User } from "../../models/user.model";
import { serverError } from "../../utils/errorHandler";
import { IBlog, IUser } from "../../utils/typings";

/**
 * @description This service is used to update a blog. It will check if the user is logged in or not. If the user is logged in then it will check if the user is the author of the blog or not. If the user is the author of the blog then it will update the blog.
 */

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
    serverError(error, res);
  }
};
