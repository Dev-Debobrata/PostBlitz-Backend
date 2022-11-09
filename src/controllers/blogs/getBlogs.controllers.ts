import { Request, Response } from "express";
import { Blog } from "../../models/blog.model";
import { IBlog } from "../../utils/typings";

export const getBlogs = async (req: Request, res: Response): Promise<any> => {
  try {
    const blogs: Array<IBlog> | null = await Blog.find({}).populate(
      "author",
      "-_id name username"
    );
    if (blogs === null) {
      res.status(404).json({ message: "Blog Not Found" });
    } else {
      res.status(200).json(blogs);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { _id } = req.params;
    const blog: IBlog | null = await Blog.findById({ _id: _id }).populate(
      "author",
      "name username"
    );
    if (blog === null) {
      res.status(404).json({ message: "Blog not found" });
    } else {
      res.status(200).json(blog);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogByTitle = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title } = req.params;
    const blog: Array<IBlog> | null = await Blog.find({ title }).populate(
      "author",
      "name username"
    );
    if (blog === null) {
      res.status(404).json({ message: "Blog not found" });
    } else {
      res.status(200).json(blog);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}; // Work in Progress
