import { Request, response, Response } from "express";
import { HydratedDocument } from "mongoose";
import { Blog } from "../models/blog.model";
import { IBlog } from "../utils/typings";

export const getBlogs = async (req: Request, res: Response): Promise<any> => {
  try {
    const blogs: Array<IBlog> | null = await Blog.find({}).populate(
      "author",
      "name username"
    );
    res.status(200).json(blogs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title } = req.params;
    const blog: IBlog | null = await Blog.findOne({ title }).populate(
      "author",
      "name username"
    );
    if (blog === null) {
      res.status(404).json({ message: "Blog not found" });
    }
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
