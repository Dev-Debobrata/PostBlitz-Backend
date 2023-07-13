import { Request, Response } from 'express';
import { verifyUserToken } from '../../middleware/token';
import { Blog } from '../../models/blog.model';
import { User } from '../../models/user.model';
import { serverError } from '../../utils/errorHandler';
import { IBlog, ITokenPayload, IUser } from '../../utils/types';
import { logger } from '../../utils/logger';

/**
 * @description This service is used to delete a blog. It will check if the user is logged in or not. If the user is logged in then it will check if the user is the author of the blog or not. If the user is the author of the blog then it will delete the blog.
 */

export const deleteBlog = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      logger.warn({ status: 403, message: 'Forbidden' });
      res.status(302).json({ message: 'Please Log In' });
      return;
    }

    const verifiedToken: ITokenPayload | undefined = await verifyUserToken(
      token
    );

    const getAuthor: IUser | null = await User.findOne({
      _id: verifiedToken?.userId
    });
    if (getAuthor === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'User Not Found' });
      return;
    }

    const { blogId } = req.params;

    const findBlog: IBlog | null = await Blog.findOne({ _id: blogId });
    if (findBlog === null) {
      logger.warn({ status: 404, message: 'Not Found' });
      res.status(404).json({ message: 'Blog Not Found' });
      return;
    }

    if (findBlog?.author.toString() !== getAuthor?._id?.toString()) {
      logger.warn({ status: 401, message: 'Unauthorized' });
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    await Blog.deleteOne({ _id: blogId });
    logger.info({ status: 200, message: 'OK' });
    res.status(200).json({ message: 'Blog Deleted Successfully' });
  } catch (error: unknown) {
    serverError(error as Error, res);
  }
};
