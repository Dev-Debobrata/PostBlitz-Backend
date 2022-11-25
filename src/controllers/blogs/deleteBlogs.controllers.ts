import { Request, Response } from "express";
import { verifyUserToken } from "../../middleware/token";
import { Blog } from "../../models/blog.model";
import { User } from "../../models/user.model";
import { IBlog, IUser } from "../../utils/typings";

export const deleteBlog = async (req: Request, res: Response): Promise<any> => {
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

    const { blogId } = req.params;

    const findBlog: IBlog | null = await Blog.findOne({ _id: blogId });
    if (findBlog === null) {
      res.status(404).json({ message: "Blog Not Found" });
    }

    if (findBlog?.author.toString() !== getAuthor?._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Blog.deleteOne({ _id: blogId });
    res.status(201).json({ message: "Blog Deleted Successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
