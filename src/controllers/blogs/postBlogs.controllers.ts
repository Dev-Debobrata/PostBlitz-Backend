import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { verifyUserToken } from "../../middleware/token";
import { Blog } from "../../models/blog.model";
import { User } from "../../models/user.model";
import { IBlog, IUser } from "../../utils/typings";

export const postBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const sessionToken = req.cookies.sessionId;
    if (!sessionToken) {
      return res.status(302).json({ message: "Please Log In" });
    }

    const verifiedToken: any | undefined = await verifyUserToken(sessionToken);

    const getAuthor: IUser | null = await User.findOne({
      sessionId: verifiedToken?.userId,
    });
    if (getAuthor === null) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const { title, author, description, content, categories, images } =
      req.body;

    const blog: HydratedDocument<IBlog> = new Blog({
      title,
      description,
      content,
      categories,
      images,
      author,
      created_At: Date.now(),
      updated_At: Date.now(),
    });
    await blog.save();
    res.status(201).json({ message: "Blog Added Successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
