import { Request, response, Response } from "express";
import { HydratedDocument } from "mongoose";
import { userInfo } from "os";
import { Blog } from "../../models/blog.model";
import { IBlog, IUser } from "../../utils/typings";

export const postBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, content, images, urls, shareLink, author } =
      req.body;

    const blog: HydratedDocument<IBlog> = new Blog({
      title,
      description,
      content,
      images,
      urls,
      shareLink,
      author,
    });
    await blog.save();
    res.status(201).json({ message: "Blog Added Successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
