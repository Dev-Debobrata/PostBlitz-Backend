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
      return res.status(404).json({ message: "Blog Not Found" });
    }
    res.status(200).json(blogs);
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
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
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
    const blog: Array<IBlog> | null = await Blog.find({
      title: { $regex: new RegExp(title.replace(/\s+/g, "\\s+"), "gi") },
    }).populate("author", "name username");
    if (blog === null) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogByCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { category } = req.params;
    const blog: Array<IBlog> | null = await Blog.find({
      categories: {
        $regex: new RegExp(category.replace(/\s+/g, "\\s+"), "gi"),
      },
    }).populate("author", "name username");
    if (blog === null) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
