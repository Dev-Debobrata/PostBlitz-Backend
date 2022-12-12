import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { verifyUserToken } from "../../middleware/token";
import { Blog } from "../../models/blog.model";
import { User } from "../../models/user.model";
import { serverError } from "../../utils/errorHandler";
import { IBlog, IUser } from "../../utils/typings";

interface Files {
  image: Express.MulterS3.File[];
}

/**
 * @description This service is used to post a blog. It will check if the user is logged in or not. If the user is logged in then it will post the blog.
 */

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

    const { title, description, content, categories } = req.body;

    const files = <Files | undefined>req.files;
    const imagesArray: String[] = [];
    files?.image.map((file) => {
      imagesArray.push(file?.location);
    });

    const blog: HydratedDocument<IBlog> = new Blog({
      title,
      description,
      content,
      categories,
      images: imagesArray,
      author: getAuthor._id.toString(),
      created_At: Date.now(),
      updated_At: Date.now(),
    });
    await blog.save();
    res.status(201).json({ message: "Blog Added Successfully" });
  } catch (error: any) {
    serverError(error, res);
  }
};
