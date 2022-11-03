import { Request, response, Response } from "express";
import { HydratedDocument } from "mongoose";
import { Blog } from "../models/blog.model";
// import { User } from "../models/user.model";
import { IBlog, IUser } from "../utils/typings";

export const getBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title } = req.body;
    const blog = await Blog.findOne<IBlog>({ title });
    res.status(200).json(blog);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// export const postBlog = (req: Request, res: Response) => {
//   try {
//     const { title, description, content, images, urls, shareLink } = req.body;
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
